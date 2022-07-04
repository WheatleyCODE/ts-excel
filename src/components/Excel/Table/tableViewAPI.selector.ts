import { ACTIVE_SEL_EL, IAllCells, IAllHeaders, SELECTED_HEADER } from '@types';
import { wutils } from '@utils';
import { WQuery } from '@wquery';
import { calcSizeSelectedArea } from './tableViewAPI.functions';

export class Selector {
  constructor(private $allCells: IAllCells, private $allHeaders: IAllHeaders) {}

  clearSelectionClassName($cells: WQuery[], className: string): WQuery[] {
    $cells.forEach(($cell) => $cell.removeClass(className));
    return $cells;
  }

  findAndSelect(cells: (string | WQuery)[], className: string): WQuery[] {
    const $result: WQuery[] = cells.map((cell) => {
      if (typeof cell === 'string') {
        if (!(this.$allCells[cell] instanceof WQuery))
          throw new Error(`Selection: Cell is not found. Id:"${cell}" in $allCells`);

        this.$allCells[cell].addClass(className);
        return this.$allCells[cell];
      }

      cell.addClass(className);
      return cell;
    });

    return $result;
  }

  clearSelectGroup($cells: WQuery[]): WQuery[] | false {
    if (!$cells.length) return [];

    const $selection = $cells[0].find('[data-selection]');

    if ($selection) {
      $selection.removeClass(ACTIVE_SEL_EL);
      $selection.css({ width: '0px', height: '0px' });
      return $cells;
    }

    return false;
  }

  selectGroup($cells: WQuery[]): WQuery[] | false {
    const { col, row } = calcSizeSelectedArea($cells);

    const $selection = $cells[0].find('[data-selection]');

    if ($selection) {
      $selection?.addClass(ACTIVE_SEL_EL);
      $selection.css({ width: `${col}px`, height: `${row}px` });
      return $cells;
    }

    return false;
  }

  selectHeaders(ids: string[]): WQuery[] {
    const $headers: WQuery[] = [];

    ids.forEach((id) => {
      const parsedId = wutils.parseCellId(id);

      Object.keys(parsedId).forEach((key) => {
        const $header: WQuery = this.$allHeaders[key][parsedId[key]];

        if ($header) {
          $headers.push($header);
          $header.addClass(SELECTED_HEADER);
        }
      });
    });

    return $headers;
  }
}
