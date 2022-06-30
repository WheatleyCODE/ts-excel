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
import { EventNames, IFacadeEmitter, Parcer } from '@core';
import { changeTextAC } from '@redux';

export class TableViewAPI {
  private $allCells: WQuery[];
  private $headers: WQuery[];
  private $groupCells: WQuery[] = [];
  private $activeCell: WQuery = $.create('div');
  private $formulaSelectCells: WQuery[] = [];

  constructor(
    private $root: WQuery,
    private emitter: IFacadeEmitter,
    private wredux: IFacadeWredux,
    private parcer: Parcer
  ) {
    this.$allCells = $root.findAll('[data-id]');
    this.$headers = [...$root.findAll('[data-maincoll]'), ...$root.findAll('[data-mainrow]')];

    this.select(ID_FIRST_CELL);
    const { parcerData } = this.wredux.getState();

    if (parcerData[ID_FIRST_CELL]) {
      this.emitter.emit(EventNames.TABLE_CELECT_CELL, parcerData[ID_FIRST_CELL].formula);
      return;
    }

    this.emitter.emit(EventNames.TABLE_CELECT_CELL, this.$activeCell.getTextContent());
  }

  selectCell(id: string): void {
    this.select(id);
  }

  selectAllCells(): void {
    this.select(this.$allCells[0]);
    this.selectAll(this.$allCells, { clear: false });
  }

  private select(cell: string | WQuery, options: ISelectOptions = {}): WQuery | undefined {
    const { emit = true, clear = true } = options;
    if (clear) this.clearGroup();
    this.$headers.forEach(($header) => $header.removeClass(SELECTED_HEADER));

    let $newCell: WQuery | undefined;

    if (cell instanceof WQuery) {
      $newCell = cell;
    }

    if (typeof cell === 'string') {
      $newCell = this.$allCells.find(($cell) => $cell.data.id === cell);
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
        if (state.parcerData[$newCell.data.id]) {
          this.wredux.dispatch(
            changeTextAC($newCell.data.id, state.parcerData[$newCell.data.id].formula)
          );
        } else {
          this.wredux.dispatch(changeTextAC($newCell.data.id, $newCell.getTextContent()));
        }
      }
    }

    if (!$newCell.data.id) return;
    const parsedId = wutils.parceCellId($newCell.data.id);

    Object.keys(parsedId).forEach((key) => {
      const $header = this.$headers.find(($header) => $header.data[key] === `${parsedId[key]}`);
      $header?.addClass(SELECTED_HEADER);
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
      const percedId = wutils.parceCellId(id);

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
          const width = wutils.parceStyleValueToInt(widthPx.width);
          const height = wutils.parceStyleValueToInt(heightPx.height);

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
      const parsedId = wutils.parceCellId($cell.data.id);

      Object.keys(parsedId).forEach((key) => {
        const $header = this.$headers.find(($header) => $header.data[key] === `${parsedId[key]}`);
        $header?.addClass(SELECTED_HEADER);
      });
    });
  }

  focusActiveCell(): void {
    this.$activeCell.focus();
  }

  changeText(string: string): void {
    const id = this.$activeCell.data.id;
    if (!id) return;
    this.$activeCell.setTextContent(this.parcer.parce(string, 'output', id));
    this.textInStore(this.$activeCell.data.id, string);
  }

  updateAllParcerResult() {
    const { parcerData } = this.wredux.getState();
    const arr = Object.keys(parcerData).map((key) => {
      if (parcerData[key].formula !== '') {
        return { id: key, formula: parcerData[key].formula };
      }

      return false;
    });

    const data = arr.filter((el) => el !== false) as { id: string; formula: string }[];

    data.forEach(({ id, formula }) => {
      const $cell = this.$allCells.find(($cell) => $cell.data.id === id);

      if ($cell && !($cell.data.id === this.$activeCell.data.id)) {
        $cell.setTextContent(this.parcer.parce(formula, 'output', $cell.data.id));
        this.clearFormulaSelect();
      }
    });
  }

  onInputHandler(): void {
    this.updateAllParcerResult();

    const string = this.$activeCell.getTextContent();
    const id = this.$activeCell.data.id;
    if (!id) return;

    this.textInStore(id, this.parcer.parce(string, 'input', id));
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

    this.$formulaSelectCells.forEach(($cell) => $cell.removeClass(FORMULA_SELECT));
    this.$formulaSelectCells = [];
  }

  onKeydownHandler(e: KeyboardEvent): void {
    const { id } = this.$activeCell.data;
    if (!id) return;

    const { key, shiftKey } = e;
    const parsedId = wutils.parceCellId(id);

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
      $newGroup = this.$allCells.filter(($cell) => $cell.data.row === row);
    }

    if (col && !row) {
      $newGroup = this.$allCells.filter(($cell) => $cell.data.col === col);
    }

    this.select($newGroup[0], { emit: false });
    this.selectAll($newGroup, { clear: false });
  }

  selectGroup(id: string): void {
    const $newCell = this.$allCells.find(($cell) => $cell.data.id === id);
    if (!$newCell) return;

    const activeCellId = this.$activeCell.data.id;
    const newCellId = $newCell.data.id;

    if (activeCellId && newCellId) {
      const actIds = wutils.parceCellId(activeCellId);
      const newIds = wutils.parceCellId(newCellId);
      const $newCells: WQuery[] = [];

      const sortCallBack = (a: number, b: number) => (a < b ? 1 : -1);

      const [maxCol, minCol] = [actIds.col, newIds.col].sort(sortCallBack);
      const [maxRow, minRow] = [actIds.row, newIds.row].sort(sortCallBack);

      for (let i = minCol; i <= maxCol; i += 1) {
        for (let j = minRow; j <= maxRow; j += 1) {
          const $cell = this.$allCells.find(($cell) => $cell.data.id === `${i}:${j}`);
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
    const $cell = this.$allCells.find(($cell) => $cell.data.idPublic === publicId);

    if ($cell) {
      $cell.addClass(FORMULA_SELECT);
      this.$formulaSelectCells.push($cell);
    }

    return $cell ? $cell.getTextContent() : false;
  }

  clearFormulaSelect() {
    this.$formulaSelectCells.forEach(($cell) => $cell.removeClass(FORMULA_SELECT));
    this.$formulaSelectCells = [];
  }

  printFormulaSelect() {
    const { parcerData } = this.wredux.getState();
    const id = this.$activeCell.data.id;
    if (!id) return;
    const data = parcerData[id];
    if (!data) return;
    this.$activeCell.setTextContent(this.parcer.parce(data.formula, 'output'));
  }
}
