import { $, WQuery } from '@wquery';
import { ID_FIRST_CELL, SELECTED_CELL, SELECTED_GROUP_CELL } from '@types';

export class TableViewAPI {
  private $allCells: WQuery[];
  private $groupCells: WQuery[] = [];
  private $activeCell: WQuery = $.create('div');

  constructor(private $root: WQuery) {
    this.$allCells = $root.findAll('[data-id]');
    this.select(ID_FIRST_CELL);
  }

  select(id: string) {
    const $condidate = this.$allCells.find(($cel) => $cel.data.id === id);
    this.selectCell($condidate);
  }

  private selectCell($condidate: WQuery | undefined) {
    this.clearGroup();
    if ($condidate) {
      this.$activeCell.removeClass(SELECTED_CELL);
      $condidate.addClass(SELECTED_CELL);
      $condidate.focus();
      this.$activeCell = $condidate;
    }
  }

  private clearGroup() {
    this.$groupCells.forEach(($cell) => $cell.removeClass(SELECTED_GROUP_CELL));
    this.$groupCells = [];
  }

  selectGroup(id: string) {
    this.clearGroup();
    const $condidate = this.$allCells.find(($cel) => $cel.data.id === id);

    if (!$condidate) return;

    if (this.$activeCell.data.id && $condidate.data.id) {
      const lastIds = this.$activeCell.data.id.split(':').map((str) => +str);
      const newIds = $condidate.data.id.split(':').map((str) => +str);

      const sortCallBack = (a: number, b: number) => (a < b ? 1 : -1);

      const [maxRow, minRow] = [lastIds[0], newIds[0]].sort(sortCallBack);
      const [maxCol, minCol] = [lastIds[1], newIds[1]].sort(sortCallBack);

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
