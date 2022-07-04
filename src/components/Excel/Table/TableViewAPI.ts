import { Selector } from './tableViewAPI.selector';
import { changeStyleAC, stylesCurrentCellAC } from '@redux';
import { $, WQuery } from '@wquery';
import {
  celectKeys,
  ID_FIRST_CELL,
  SELECTED_CELL,
  SELECTED_HEADER,
  IFacadeWredux,
  FORMULA_SELECT,
  IAllCells,
  IAllHeaders
} from '@types';
import { wutils } from '@utils';
import { EventNames, IFacadeEmitter, Parser } from '@core';
import { changeTextAC } from '@redux';
import { changeCellOnKeydown, findAllCells, findAllHeaders } from './tableViewAPI.functions';

export class TableViewAPI {
  private $allCells: IAllCells;
  private $allHeaders: IAllHeaders;
  private $activeHeaders: WQuery[] = [];
  private $groupCells: WQuery[] = [];
  private $activeCell: WQuery = $.create('div');
  private $formulaSelectCells: WQuery[] = [];
  private selector: Selector;

  constructor(
    $root: WQuery,
    private emitter: IFacadeEmitter,
    private wredux: IFacadeWredux,
    private parser: Parser
  ) {
    this.$allCells = findAllCells($root);
    this.$allHeaders = findAllHeaders($root);
    this.selector = new Selector(this.$allCells, this.$allHeaders);

    this.selectCell(ID_FIRST_CELL);

    const state = this.wredux.getState();
    const { parserData } = state.excelState;

    if (parserData[ID_FIRST_CELL]) {
      this.emitter.emit(EventNames.TABLE_CELECT_CELL, parserData[ID_FIRST_CELL].formula);
      return;
    }

    this.emitter.emit(EventNames.TABLE_CELECT_CELL, this.$activeCell.textContent);
  }

  clearSelectCell(): void {
    this.selector.clearSelectionClassName([this.$activeCell], SELECTED_CELL);
  }

  selectCell(cell: string | WQuery): WQuery | false {
    this.clearHeaders();
    this.clearGroup();
    this.clearSelectCell();
    this.clearSelectFormulaCells();

    const [$cell] = this.selector.findAndSelect([cell], SELECTED_CELL);

    if ($cell) {
      $cell.focus();
      this.selectHeaders([$cell]);
      this.emitData($cell);
      this.$activeCell = $cell;
      return $cell;
    }

    return false;
  }

  selectGroup(id: string): WQuery[] | false {
    this.clearGroup();
    const $newCell = this.$allCells[id];
    if (!$newCell) return false;

    const activeCellId = this.$activeCell.data.id;
    const newCellId = $newCell.data.id;

    if (activeCellId && newCellId) {
      const [actIds, newIds] = [activeCellId, newCellId].map((id) => wutils.parseCellId(id));
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
      const $cells = this.selector.selectGroup($newCells);

      if ($cells) {
        this.$groupCells = $cells;
        this.selectHeaders($cells);
        return $cells;
      }
    }

    return false;
  }

  clearGroup(): void {
    this.selector.clearSelectGroup(this.$groupCells);
    this.$groupCells = [];
  }

  emitData($cell: WQuery): WQuery | false {
    const id = $cell.data.id;
    const idPublic = $cell.data.id;
    if (!id || !idPublic) return false;

    this.emitter.emit(EventNames.TABLE_EMIT_INFO, idPublic);

    const state = this.wredux.getState();
    const { parserData } = state.excelState;

    if (parserData[id]) {
      this.wredux.dispatch(changeTextAC(id, parserData[id].formula));
    } else {
      this.wredux.dispatch(changeTextAC(id, $cell.textContent));
    }

    this.wredux.dispatch(stylesCurrentCellAC($cell.getStyles()));
    return $cell;
  }

  selectHeaders($cells: WQuery[]): void {
    const ids: string[] = [];

    $cells.forEach(($cell) => {
      const id = $cell.data.id;
      if (id) ids.push(id);
    });

    const $headers = this.selector.selectHeaders(ids);
    this.$activeHeaders = $headers;
  }

  clearHeaders(): void {
    this.selector.clearSelectionClassName(this.$activeHeaders, SELECTED_HEADER);
    this.$activeHeaders = [];
  }

  selectAllCells(): void {
    const $cells = Object.values(this.$allCells);
    this.selectCell($cells[0]);
    this.selector.selectGroup($cells);
    this.$groupCells = $cells;
  }

  clearSelectFormulaCells(): void {
    this.selector.clearSelectionClassName(this.$formulaSelectCells, FORMULA_SELECT);
    this.$formulaSelectCells = [];
  }

  selectFormulaCells(): void {
    const state = this.wredux.getState();
    const id = this.$activeCell.data.id;

    if (!id) return;
    const data = state.excelState.parserData[id];
    if (!data) return;
    const ids = this.parser.checkCells(data.formula);

    const $cells = this.selector.findAndSelect(ids, FORMULA_SELECT);
    this.$formulaSelectCells = $cells;
  }

  focusActiveCell(): void {
    this.$activeCell.focus();
  }

  applyStyle(style: { [key: string]: string }): void {
    this.$activeCell.css(style);

    this.$groupCells.forEach(($cell) => {
      if (!$cell.data.id) return;
      $cell.css(style);
      this.wredux.dispatch(changeStyleAC($cell.data.id, style));
    });

    this.$activeCell.focus();
  }

  updateSelectGroup(): void {
    console.log(this.$groupCells);
    this.selector.selectGroup(this.$groupCells);
  }

  textInStore(id: string, text: string): void {
    this.wredux.dispatch(changeTextAC(id, text));
  }

  changeText(string: string): void {
    const id = this.$activeCell.data.id;
    if (!id) return;
    this.$activeCell.setTextContent(this.parser.parse(string, 'output', id));
    this.textInStore(id, string);
  }

  onInputHandler(): void {
    this.updateAllParserResult();

    const string = this.$activeCell.textContent;
    const id = this.$activeCell.data.id;
    if (!id) return;

    this.textInStore(id, this.parser.parse(string, 'input', id));
  }

  updateAllParserResult(): void {
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

    this.clearSelectFormulaCells();
    this.selectFormulaCells();
  }

  onKeydownHandler(e: KeyboardEvent): void {
    const { id } = this.$activeCell.data;
    if (!id) return;

    const { key, shiftKey } = e;
    const parsedId = wutils.parseCellId(id);

    if (celectKeys.includes(key)) {
      e.preventDefault();
      const { col, row } = changeCellOnKeydown(key, parsedId, shiftKey);
      this.selectCell(`${col}:${row}`);
    }
  }

  selectFullColumnOrRow(col: string | undefined, row: string | undefined): void {
    let $newGroup: WQuery[] = [];

    if (row && !col) {
      $newGroup = Object.values(this.$allCells).filter(($cell) => $cell.data.row === row);
    }

    if (col && !row) {
      $newGroup = Object.values(this.$allCells).filter(($cell) => $cell.data.col === col);
    }

    this.selectCell($newGroup[0]);
    const $cells = this.selector.selectGroup($newGroup);
    if ($cells) this.$groupCells = $cells;
  }

  getText(publicId: string): string | false {
    const $cell = this.$allCells[publicId];
    return $cell ? $cell.textContent : false;
  }
}
