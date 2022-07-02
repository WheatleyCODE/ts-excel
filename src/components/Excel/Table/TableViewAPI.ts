import { changeStyleAC, stylesCurrentCellAC } from '@redux';
import { $, WQuery } from '@wquery';
import {
  celectKeys,
  EventKeys,
  ICellId,
  ID_FIRST_CELL,
  ISelectOptions,
  SELECTED_CELL,
  SELECTED_HEADER,
  IFacadeWredux,
  IStyle,
  ACTIVE_SEL_EL,
  FORMULA_SELECT
} from '@types';
import { wutils } from '@utils';
import { EventNames, IFacadeEmitter, Parser } from '@core';
import { changeTextAC } from '@redux';

interface IAllHeaders {
  col: { [key: string]: WQuery };
  row: { [key: string]: WQuery };
}

interface IAllCells {
  [key: string]: WQuery;
}

export class TableViewAPI {
  private $allCells: IAllCells = {};
  private $allHeaders: IAllHeaders = { col: {}, row: {} };
  private $activeHeaders: WQuery[] = [];
  private $groupCells: WQuery[] = [];
  private $activeCell: WQuery = $.create('div');
  private $formulaSelectCells: WQuery[] = [];

  constructor(
    private $root: WQuery,
    private emitter: IFacadeEmitter,
    private wredux: IFacadeWredux,
    private parser: Parser
  ) {
    const allCels = $root.findAll('[data-id]');

    allCels.forEach(($cell) => {
      const id = $cell.data.id;
      const idPublic = $cell.data.idPublic;

      if (!id || !idPublic) return;

      this.$allCells[id] = $cell;
      this.$allCells[idPublic] = $cell;
    });

    const allHeaders = [...$root.findAll('[data-maincoll]'), ...$root.findAll('[data-mainrow]')];

    allHeaders.forEach(($header) => {
      let key: string | null = null;

      if ($header.data.col) key = 'col';
      if ($header.data.row) key = 'row';
      if (!key) return;

      this.$allHeaders[key][$header.data[key]] = $header;
    });

    this.select(ID_FIRST_CELL);
    const state = this.wredux.getState();
    const { parserData } = state.excelState;

    if (parserData[ID_FIRST_CELL]) {
      this.emitter.emit(EventNames.TABLE_CELECT_CELL, parserData[ID_FIRST_CELL].formula);
      return;
    }

    this.emitter.emit(EventNames.TABLE_CELECT_CELL, this.$activeCell.getTextContent());
  }

  private selectHeader(key: string, id: string) {
    const $cell: WQuery = this.$allHeaders[key][id];

    if ($cell) {
      $cell.addClass(SELECTED_HEADER);
      this.$activeHeaders.push($cell);
    }
  }

  selectCell(id: string): void {
    this.select(id);
  }

  selectAllCells(): void {
    this.select(this.$allCells[0]);
    this.selectAll(Object.values(this.$allCells), { clear: false });
  }

  private select(cell: string | WQuery, options: ISelectOptions = {}): WQuery | undefined {
    const { emit = true, clear = true } = options;
    if (clear) this.clearGroup();
    this.$activeHeaders.forEach(($cell) => $cell.removeClass(SELECTED_HEADER));

    let $newCell: WQuery | undefined;

    if (cell instanceof WQuery) {
      $newCell = cell;
    }

    if (typeof cell === 'string') {
      $newCell = this.$allCells[cell];
    }

    if (!$newCell) return;

    this.$activeCell.removeClass(SELECTED_CELL);
    $newCell.addClass(SELECTED_CELL);
    $newCell.focus();
    this.$activeCell = $newCell;

    if (emit) {
      this.emitter.emit(EventNames.TABLE_EMIT_INFO, $newCell.data.idPublic);

      if ($newCell.data.id) {
        const state = this.wredux.getState();
        const { parserData } = state.excelState;

        if (parserData[$newCell.data.id]) {
          this.wredux.dispatch(
            changeTextAC($newCell.data.id, parserData[$newCell.data.id].formula)
          );
        } else {
          this.wredux.dispatch(changeTextAC($newCell.data.id, $newCell.getTextContent()));
        }
      }
    }

    if (!$newCell.data.id) return;
    const parsedId = wutils.parseCellId($newCell.data.id);

    Object.keys(parsedId).forEach((key) => {
      this.selectHeader(key, parsedId[key]);
    });

    this.wredux.dispatch(stylesCurrentCellAC($newCell.getStyles()));
    return $newCell;
  }

  reActivateVisualSelection() {
    if (!this.$groupCells.length) return;
    this.activateVisualSelection(this.$groupCells);
  }

  private activateVisualSelection($cells: WQuery[]) {
    const idFirstCell = this.$groupCells[0].data.id;
    const idLastCell = this.$groupCells[this.$groupCells.length - 1].data.id;

    if (!idFirstCell || !idLastCell) return;

    const sortCallBack = (a: number, b: number) => (a < b ? 1 : -1);
    const idsArr: { col: number[]; row: number[] } = { col: [], row: [] };

    [idFirstCell, idLastCell].forEach((id) => {
      const percedId = wutils.parseCellId(id);

      Object.keys(percedId).forEach((key) => {
        if (percedId[key]) idsArr[key].push(percedId[key]);
      });
    });

    Object.keys(idsArr).forEach((key) => {
      idsArr[key] = idsArr[key].filter(sortCallBack);
    });

    const count = Object.keys(idsArr).reduce(
      (acc, key) => {
        const [min, max] = idsArr[key];
        const result = max - min + 1;

        acc[key] = result;

        return acc;
      },
      { col: 0, row: 0 }
    );

    const sum = $cells.reduce(
      (acc, $cell) => {
        const widthPx = $cell.getStyles(['width']);
        const heightPx = $cell.getParent('[data-type="resizable"]')?.getStyles(['height']);

        if (widthPx && heightPx) {
          const width = wutils.parseStyleValueToInt(widthPx.width);
          const height = wutils.parseStyleValueToInt(heightPx.height);

          acc.row += height;
          acc.col += width;
        }

        return acc;
      },
      { col: 0, row: 0 }
    );

    Object.keys(sum).forEach((key) => {
      sum[key] = sum[key] / this.$groupCells.length - 1;
    });

    const { col, row } = Object.keys(sum).reduce(
      (acc, key) => {
        acc[key] = sum[key] * count[key] + count[key];
        return acc;
      },
      { col: 0, row: 0 }
    );

    const $selection = $cells[0].find('[data-selection]');

    if ($selection) {
      $selection?.addClass(ACTIVE_SEL_EL);
      $selection.css({ width: `${col}px`, height: `${row}px` });
    }
  }

  private selectAll($cells: WQuery[], options: ISelectOptions = {}): void {
    const { emit = true, clear = true } = options;
    if (clear) this.clearGroup();
    this.$groupCells = $cells;

    if (emit) {
      this.emitter.emit(
        EventNames.TABLE_EMIT_INFO,
        `${$cells[0].data.idPublic}:${$cells[$cells.length - 1].data.idPublic}`
      );

      if (this.$activeCell.data.id) {
        this.wredux.dispatch(
          changeTextAC(this.$activeCell.data.id, this.$activeCell.getTextContent())
        );
      }
    }

    this.activateVisualSelection($cells);

    $cells.forEach(($cell) => {
      if (!$cell.data.id) return;
      const parsedId = wutils.parseCellId($cell.data.id);

      Object.keys(parsedId).forEach((key) => {
        this.selectHeader(key, parsedId[key]);
      });
    });
  }

  focusActiveCell(): void {
    this.$activeCell.focus();
  }

  changeText(string: string): void {
    const id = this.$activeCell.data.id;
    if (!id) return;
    this.$activeCell.setTextContent(this.parser.parse(string, 'output', id));
    this.textInStore(this.$activeCell.data.id, string);
  }

  updateAllParserResult() {
    const state = this.wredux.getState();
    const { parserData } = state.excelState;
    const arr = Object.keys(parserData).map((key) => {
      if (parserData[key].formula !== '') {
        return { id: key, formula: parserData[key].formula };
      }

      return false;
    });

    const data = arr.filter((el) => el !== false) as { id: string; formula: string }[];

    data.forEach(({ id, formula }) => {
      const $cell = this.$allCells[id];

      if ($cell && !($cell.data.id === this.$activeCell.data.id)) {
        $cell.setTextContent(this.parser.parse(formula, 'output', $cell.data.id));
      }
    });

    this.clearFormulaSelect();
    this.printFormulaSelect();
  }

  onInputHandler(): void {
    this.updateAllParserResult();

    const string = this.$activeCell.getTextContent();
    const id = this.$activeCell.data.id;
    if (!id) return;

    this.textInStore(id, this.parser.parse(string, 'input', id));
  }

  private textInStore(id: string | undefined, text: string) {
    if (id) {
      this.wredux.dispatch(changeTextAC(id, text));
    }
  }

  private clearGroup(): void {
    if (this.$groupCells.length) {
      const $selection = this.$groupCells[0].find('[data-selection]');

      if ($selection) {
        $selection.removeClass(ACTIVE_SEL_EL);
        $selection.css({ width: '0px', height: '0px' });
      }

      this.$groupCells = [];
    }

    this.clearFormulaSelect();
  }

  onKeydownHandler(e: KeyboardEvent): void {
    const { id } = this.$activeCell.data;
    if (!id) return;

    const { key, shiftKey } = e;
    const parsedId = wutils.parseCellId(id);

    if (celectKeys.includes(key)) {
      e.preventDefault();
      this.keyDownSelectCell(key, parsedId, shiftKey);
    }
  }

  private keyDownSelectCell(key: string, { col, row }: ICellId, isShiftKey: boolean): void {
    switch (key) {
      case EventKeys.ARROW_UP:
        row--;
        break;
      case EventKeys.ARROW_DOWN:
        row++;
        break;
      case EventKeys.ARROW_LEFT:
        col--;
        break;
      case EventKeys.ARROW_RIGHT:
        col++;
        break;
      case EventKeys.TAB:
        isShiftKey ? col-- : col++;
        break;
      case EventKeys.ENTER:
        isShiftKey ? row-- : row++;
        break;
    }

    this.select(`${col}:${row}`);
  }

  selectFullColumnOrRow(col: string | undefined, row: string | undefined): void {
    let $newGroup: WQuery[] = [];

    if (row && !col) {
      $newGroup = Object.values(this.$allCells).filter(($cell) => $cell.data.row === row);
    }

    if (col && !row) {
      $newGroup = Object.values(this.$allCells).filter(($cell) => $cell.data.col === col);
    }

    this.select($newGroup[0], { emit: false });
    this.selectAll($newGroup, { clear: false });
  }

  selectGroup(id: string): void {
    const $newCell = this.$allCells[id];
    if (!$newCell) return;

    const activeCellId = this.$activeCell.data.id;
    const newCellId = $newCell.data.id;

    if (activeCellId && newCellId) {
      const actIds = wutils.parseCellId(activeCellId);
      const newIds = wutils.parseCellId(newCellId);
      const $newCells: WQuery[] = [];

      const sortCallBack = (a: number, b: number) => (a < b ? 1 : -1);

      const [maxCol, minCol] = [actIds.col, newIds.col].sort(sortCallBack);
      const [maxRow, minRow] = [actIds.row, newIds.row].sort(sortCallBack);

      for (let i = minCol; i <= maxCol; i += 1) {
        for (let j = minRow; j <= maxRow; j += 1) {
          const $cell = this.$allCells[`${i}:${j}`];
          if ($cell) $newCells.push($cell);
        }
      }

      this.$activeCell.focus();
      this.selectAll($newCells);
    }
  }

  applyStyle(style: { [key: string]: string }): void {
    if (this.$groupCells.length) {
      this.$groupCells.forEach(($cell) => {
        if (!$cell.data.id) return;
        $cell.css(style);
        this.wredux.dispatch(changeStyleAC($cell.data.id, style));
      });
      this.$activeCell.focus();
      return;
    }

    this.$activeCell.css(style);
    this.$activeCell.focus();
    if (!this.$activeCell.data.id) return;
    this.wredux.dispatch(changeStyleAC(this.$activeCell.data.id, style));
  }

  private changeType($cell: WQuery, type: string): void {
    const text = $cell.getTextContent();
    const numbers = Number(text);
    if (isNaN(numbers)) {
      if (text[text.length - 1] === '%' || text[text.length - 1] === 'р') {
        const numbers = text.slice(0, -1);
        $cell.setHtml(`${numbers}`);
      }

      return;
    }

    let per = '';
    if (type === 'percent') per = '%';
    if (type === 'ruble') per = 'р';

    $cell.setHtml(`${numbers} ${per}`);
  }

  changeDataType(type: IStyle) {
    const dType = type.dataType;
    if (!(typeof dType === 'string')) return;

    if (this.$groupCells.length) {
      this.$groupCells.forEach(($cell) => this.changeType($cell, dType));
      return;
    }

    this.changeType(this.$activeCell, dType);
  }

  getText(publicId: string): string | false {
    const $cell = this.$allCells[publicId];
    return $cell ? $cell.getTextContent() : false;
  }

  clearFormulaSelect() {
    this.$formulaSelectCells.forEach(($cell) => $cell.removeClass(FORMULA_SELECT));
    this.$formulaSelectCells = [];
  }

  printFormulaSelect() {
    const state = this.wredux.getState();
    const { parserData } = state.excelState;
    const id = this.$activeCell.data.id;
    if (!id) return;
    const data = parserData[id];
    if (!data) return;

    const ids = this.parser.checkCells(data.formula);

    ids.forEach((id) => {
      const $cell = this.$allCells[id];

      if ($cell) {
        $cell.addClass(FORMULA_SELECT);
        this.$formulaSelectCells.push($cell);
      }
    });
  }
}
