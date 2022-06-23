import { $, WQuery } from '@wquery';
import {
  celectKeys,
  EventKeys,
  ICellId,
  ID_FIRST_CELL,
  SELECTED_CELL,
  SELECTED_GROUP_CELL
} from '@types';
import { wutils } from '@utils';
import { EventNames, IFacadeEmitter } from '@core';

export class TableViewAPI {
  private $allCells: WQuery[];
  private $groupCells: WQuery[] = [];
  private $activeCell: WQuery = $.create('div');

  constructor(private $root: WQuery, private emitter: IFacadeEmitter) {
    this.$allCells = $root.findAll('[data-id]');
    this.select(ID_FIRST_CELL);
  }

  private activateCell($newCell: WQuery | undefined, activate = true) {
    if (!$newCell || !activate) return;
    this.emitter.emit(EventNames.TABLE_CELECT_CELL, $newCell.getTextContent());
    this.$activeCell.removeClass(SELECTED_CELL);
    $newCell.addClass(SELECTED_CELL);
    $newCell.focus();
    this.$activeCell = $newCell;
    this.emitter.emit(EventNames.TABLE_EMIT_INFO, $newCell.data.id);
  }

  selectAll() {
    this.clearGroup();
    this.select(this.$allCells[0]);
    this.$groupCells = this.$allCells;
    this.$groupCells.forEach(($cell) => $cell.addClass(SELECTED_GROUP_CELL));
  }

  select(cell: WQuery | ICellId | string | undefined, activate = true): WQuery | undefined {
    this.clearGroup();

    if (!cell) return;

    if (cell && cell instanceof WQuery) {
      this.activateCell(cell, activate);
      return cell;
    }

    if (typeof cell === 'string') {
      const $newCell = this.$allCells.find(($cel) => $cel.data.id === cell);
      this.activateCell($newCell, activate);
      return $newCell;
    }

    const $newCell = this.$allCells.find(($cel) => $cel.data.id === `${cell.row}:${cell.col}`);
    this.activateCell($newCell, activate);
    return $newCell;
  }

  selectActiveCell() {
    this.activateCell(this.$activeCell);
  }

  changeText(string: string) {
    this.$activeCell.setTextContent(string);
  }

  onInputHandler() {
    this.emitter.emit(EventNames.TABLE_INPUT, this.$activeCell.getTextContent());
  }

  private clearGroup() {
    this.$groupCells.forEach(($cell) => $cell.removeClass(SELECTED_GROUP_CELL));
    this.$groupCells = [];
  }

  onKeydownHandler(e: KeyboardEvent) {
    const activeId = this.$activeCell.data.id;
    if (!activeId) return;

    const { key, shiftKey } = e;
    const id = wutils.parceCellId(activeId);

    if (celectKeys.includes(key)) {
      e.preventDefault();
      this.keyDownSelectCell(key, id, shiftKey);
    }
  }

  private keyDownSelectCell(key: string, { row, col }: ICellId, isShiftKey: boolean) {
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

    this.select({ col, row });
  }

  selectFullColumnOrRow(row: string | undefined, col: string | undefined) {
    this.clearGroup();
    let $newGroup: WQuery[] = [];

    if (row && !col) {
      const correctRow = `${+row - 1}`;
      $newGroup = this.$allCells.filter(($cell) => $cell.data.row === correctRow);
    }

    if (col && !row) {
      const correctColl = `${+col}`;
      $newGroup = this.$allCells.filter(($cell) => $cell.data.col === correctColl);
    }

    $newGroup.forEach(($cell) => $cell.addClass(SELECTED_GROUP_CELL));
    this.select($newGroup[0]);
    this.$groupCells = $newGroup;
  }

  selectGroup(id: string) {
    this.clearGroup();
    const $newCell = this.select(id, false);

    if (!$newCell) return;

    const activeCellId = this.$activeCell.data.id;
    const newCellId = $newCell.data.id;

    if (activeCellId && newCellId) {
      const actIds = wutils.parceCellId(activeCellId);
      const newIds = wutils.parceCellId(newCellId);

      const sortCallBack = (a: number, b: number) => (a < b ? 1 : -1);

      const [maxRow, minRow] = [actIds.row, newIds.row].sort(sortCallBack);
      const [maxCol, minCol] = [actIds.col, newIds.col].sort(sortCallBack);

      for (let i = minRow; i <= maxRow; i += 1) {
        for (let j = minCol; j <= maxCol; j += 1) {
          const $cell = this.$allCells.find(($cell) => $cell.data.id === `${i}:${j}`);

          if ($cell) {
            $cell.addClass(SELECTED_GROUP_CELL);
            this.$groupCells.push($cell);
          }
        }
      }

      this.$groupCells.forEach(($cell) => $cell.addClass(SELECTED_GROUP_CELL));
    }

    this.$activeCell.focus();
  }
}
