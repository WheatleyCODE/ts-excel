import { $, WQuery } from '@wquery';
import {
  celectKeys,
  EventKeys,
  ICellId,
  ID_FIRST_CELL,
  ISelectOptions,
  SELECTED_CELL,
  SELECTED_HEADER,
  SELECTED_GROUP_CELL,
  IFacadeWredux
} from '@types';
import { wutils } from '@utils';
import { EventNames, IFacadeEmitter } from '@core';
import { changeTextAC } from '@redux';

export class TableViewAPI {
  private $allCells: WQuery[];
  private $headers: WQuery[];
  private $groupCells: WQuery[] = [];
  private $activeCell: WQuery = $.create('div');

  constructor(
    private $root: WQuery,
    private emitter: IFacadeEmitter,
    private wredux: IFacadeWredux
  ) {
    this.$allCells = $root.findAll('[data-id]');
    this.$headers = [...$root.findAll('[data-maincoll]'), ...$root.findAll('[data-mainrow]')];

    this.select(ID_FIRST_CELL);
  }

  selectCell(id: string): void {
    this.select(id);
  }

  selectAllCells(): void {
    this.select(this.$allCells[0]);
    this.selectAll(this.$allCells, { emit: false, clear: false });
    this.emitter.emit(EventNames.TABLE_EMIT_INFO, 'All');
  }

  private select(cell: string | WQuery, options: ISelectOptions = {}): WQuery | undefined {
    const { emit = true, clear = true } = options;
    if (clear) this.clearGroup();
    this.$headers.forEach(($header) => $header.removeClass('selected'));

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
      this.emitter.emit(EventNames.TABLE_CELECT_CELL, $newCell.getTextContent());
    }

    if (!$newCell.data.id) return;
    const parsedId = wutils.parceCellId($newCell.data.id);

    Object.keys(parsedId).forEach((key) => {
      const $header = this.$headers.find(($header) => $header.data[key] === `${parsedId[key]}`);
      $header?.addClass(SELECTED_HEADER);
    });

    return $newCell;
  }

  private selectAll($cells: WQuery[], options: ISelectOptions = {}): void {
    const { emit = true, clear = true } = options;
    if (clear) this.clearGroup();

    $cells.forEach(($cell) => $cell.addClass(SELECTED_GROUP_CELL));
    this.$groupCells = $cells;

    if (emit) {
      this.emitter.emit(
        EventNames.TABLE_EMIT_INFO,
        `${$cells[0].data.idPublic}:${$cells[$cells.length - 1].data.idPublic}`
      );
    }

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
    this.$activeCell.setTextContent(string);

    this.textInStore(this.$activeCell.data.id, this.$activeCell.getTextContent());
  }

  onInputHandler(): void {
    this.textInStore(this.$activeCell.data.id, this.$activeCell.getTextContent());
  }

  private textInStore(id: string | undefined, text: string) {
    if (id) {
      this.wredux.dispatch(changeTextAC(id, text));
    }
  }

  private clearGroup(): void {
    this.$groupCells.forEach(($cell) => $cell.removeClass(SELECTED_GROUP_CELL));
    this.$groupCells = [];
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
}
