import { Selector } from './tableViewAPI.selector';
import { $, WQuery } from '@wquery';
import {
  celectKeys,
  ID_FIRST_CELL,
  SELECTED_CELL,
  SELECTED_HEADER,
  IFacadeWredux,
  FORMULA_SELECT,
  IAllCells,
  IAllHeaders,
  IStyle
} from '@types';
import { wutils } from '@utils';
import { IFacadeEmitter, Parser } from '@core';
import { changeCellOnKeydown, findAllCells, findAllHeaders } from './tableViewAPI.functions';
import { DataSender } from './tableViewAPI.dataSender';
import { Typer } from './tableViewAPI.typer';

export class TableViewAPI {
  private $allCells: IAllCells;
  private $allHeaders: IAllHeaders;
  private $activeHeaders: WQuery[] = [];
  private $groupCells: WQuery[] = [];
  private $activeCell: WQuery = $.create('div');
  private $formulaSelectCells: WQuery[] = [];
  private selector: Selector;
  private dataSender: DataSender;
  private typer: Typer;

  constructor(
    $root: WQuery,
    emitter: IFacadeEmitter,
    wredux: IFacadeWredux,
    private parser: Parser
  ) {
    this.$allCells = findAllCells($root);
    this.$allHeaders = findAllHeaders($root);
    this.selector = new Selector(this.$allCells, this.$allHeaders);
    this.dataSender = new DataSender(emitter, wredux);
    this.typer = new Typer();

    this.selectCell(ID_FIRST_CELL);
    this.dataSender.sendFirstRenderCell(ID_FIRST_CELL, this.$activeCell.textContent);
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
      this.dataSender.emitData($cell);
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
    const { parserData } = this.dataSender.excelState;
    const id = this.$activeCell.data.id;

    if (!id) return;
    const data = parserData[id];
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
      this.dataSender.sendStylesChanged($cell.data.id, style);
    });

    if (this.$activeCell.data.id)
      this.dataSender.sendStylesChanged(this.$activeCell.data.id, style);

    this.$activeCell.focus();
  }

  updateSelectGroup(): void {
    if (!this.$groupCells.length) return;
    this.selector.selectGroup(this.$groupCells);
  }

  changeText(string: string): void {
    const id = this.$activeCell.data.id;
    if (!id) return;
    this.$activeCell.setTextContent(this.parser.parse(string, 'output', id));
    this.dataSender.sendTextInStore(id, string);
  }

  onInputHandler(): void {
    this.updateAllParserResult();

    const string = this.$activeCell.textContent;
    const id = this.$activeCell.data.id;
    if (!id) return;

    this.dataSender.sendTextInStore(id, this.parser.parse(string, 'input', id));
  }

  updateAllParserResult(): void {
    const { parserData } = this.dataSender.excelState;

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

  changeType(type: IStyle): void {
    const dType = type.dataType;
    if (!(typeof dType === 'string')) return;

    if (this.$groupCells.length) {
      this.$groupCells.forEach(($cell) => this.typer.changeTypeCell($cell, dType));
      return;
    }

    this.typer.changeTypeCell(this.$activeCell, dType);
  }
}
