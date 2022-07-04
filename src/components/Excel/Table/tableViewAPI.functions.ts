import { EventKeys, IAllCells, IAllHeaders, ICellId } from '@types';
import { wutils } from '@utils';
import { WQuery } from '@wquery';

export function findAllCells($root: WQuery): IAllCells {
  const allCells = $root.findAll('[data-id]');
  const objCells: IAllCells = {};

  allCells.forEach(($cell) => {
    const id = $cell.data.id;
    const idPublic = $cell.data.idPublic;

    if (!id || !idPublic) return;

    objCells[id] = $cell;
    objCells[idPublic] = $cell;
  });

  return objCells;
}

export function findAllHeaders($root: WQuery) {
  const allHeaders = [...$root.findAll('[data-maincoll]'), ...$root.findAll('[data-mainrow]')];
  const objHeaders: IAllHeaders = { col: {}, row: {} };

  allHeaders.forEach(($header) => {
    let key: string | null = null;

    if ($header.data.col) key = 'col';
    if ($header.data.row) key = 'row';
    if (!key) return;

    objHeaders[key][$header.data[key]] = $header;
  });

  return objHeaders;
}

export function changeCellOnKeydown(key: string, cellId: ICellId, isShift: boolean): typeof cellId {
  let { col, row } = cellId;

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
      isShift ? col-- : col++;
      break;
    case EventKeys.ENTER:
      isShift ? row-- : row++;
      break;
  }

  return { col, row };
}

export function calcSizeSelectedArea($cells: WQuery[]): { col: number; row: number } {
  const length = $cells.length - 1;
  const idFirstCell = $cells[0].data.id;
  const idLastCell = $cells[length].data.id;

  if (!idFirstCell || !idLastCell) return { col: 0, row: 0 };

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
    sum[key] = sum[key] / $cells.length - 1;
  });

  const result = Object.keys(sum).reduce(
    (acc, key) => {
      acc[key] = sum[key] * count[key] + count[key];
      return acc;
    },
    { col: 0, row: 0 }
  );

  return result;
}
