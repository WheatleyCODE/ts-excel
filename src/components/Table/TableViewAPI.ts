import { $, WQuery } from '@wquery';
import { ID_FIRST_CELL, SELECTED_CELL, SELECTED_GROUP_CELL } from '@types';
import { splitAndToInt } from '@utils';

export class TableViewAPI {
  private $allCells: WQuery[];
  private $groupCells: WQuery[] = [];
  private $activeCell: WQuery = $.create('div');

  constructor(private $root: WQuery) {
    this.$allCells = $root.findAll('[data-id]');
    this.select(ID_FIRST_CELL);
  }

  select(id: string) {
    const $newCell = this.$allCells.find(($cel) => $cel.data.id === id);
    this.selectCell($newCell);
  }

  private selectCell($newCell: WQuery | undefined) {
    this.clearGroup();
    if ($newCell) {
      this.$activeCell.removeClass(SELECTED_CELL);
      $newCell.addClass(SELECTED_CELL);
      $newCell.focus();
      this.$activeCell = $newCell;
    }
  }

  private clearGroup() {
    this.$groupCells.forEach(($cell) => $cell.removeClass(SELECTED_GROUP_CELL));
    this.$groupCells = [];
  }

  selectGroup(id: string) {
    this.clearGroup();
    const $newCell = this.$allCells.find(($cel) => $cel.data.id === id);

    if (!$newCell) return;

    const activeCellId = this.$activeCell.data.id;
    const newCellId = $newCell.data.id;

    if (activeCellId && newCellId) {
      const actIds = splitAndToInt(activeCellId, ':');
      const newIds = splitAndToInt(newCellId, ':');

      const sortCallBack = (a: number, b: number) => (a < b ? 1 : -1);

      const [maxRow, minRow] = [actIds[0], newIds[0]].sort(sortCallBack);
      const [maxCol, minCol] = [actIds[1], newIds[1]].sort(sortCallBack);

      for (let i = minRow; i <= maxRow; i += 1) {
        for (let j = minCol; j <= maxCol; j += 1) {
          const $cell = this.$allCells.find(($cell) => $cell.data.id === `${i}:${j}`);

          if ($cell) {
            $cell.addClass(SELECTED_GROUP_CELL);
            this.$groupCells.push($cell);
          }
        }
      }
    }

    this.$activeCell.focus();
  }
}
