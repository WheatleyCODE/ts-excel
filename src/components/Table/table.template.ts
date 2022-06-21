import { CODES } from '@types';

function createCell(rowNumber: number) {
  return function (_: string, i: number) {
    return `
      <div contenteditable
        data-col="${i}"
        data-row="${rowNumber}"
        data-id="${rowNumber}:${i}"
        class="data__cell">
      </div>
    `;
  };
}

function createCol(letter: string, i: number) {
  return `
    <div data-type="resizable" data-col="${i}" class="data__column">
      ${letter}
      <div data-resize="col" class="data__col-resize col-resize"></div>
    </div>
  `;
}

function createRow(cols = '', i: string | number = '') {
  const resizer = i ? '<div data-resize="row" class="row__row-resize row-resize"></div>' : '';
  return `
    <div data-row="${i}" data-type="resizable" class="excel-table__row row">
      <div class="row__info">${i} ${resizer}</div>
      <div class="row__data data">${cols}</div>
    </div>
  `;
}

function toChar(_: string, i: number, count: number) {
  if (count) {
    return String.fromCharCode(CODES.A + i).repeat(count + 1);
  }

  return String.fromCharCode(CODES.A + i);
}

function createCollumsArr(number: number, count: number) {
  return new Array(number)
    .fill('')
    .map((_, i) => toChar(_, i, count))
    .map(createCol);
}

export function createTable(rowsCount = 60, colsCount = 30) {
  const maxColsCount = CODES.Z - CODES.A + 1;
  const inerationCount = Math.ceil(colsCount / maxColsCount);
  let maxCols = colsCount;
  const rows: string[] = [];
  let cols: string[] = [];

  for (let x = 0; x < inerationCount; x++) {
    if (maxCols >= maxColsCount) {
      cols = [...cols, ...createCollumsArr(maxColsCount, x)];
      maxCols = maxCols - maxColsCount;
    } else {
      cols = [...cols, ...createCollumsArr(maxCols, x)];
      maxCols = maxCols - maxCols;
    }
  }

  rows.push(createRow(cols.join('')));

  for (let y = 0; y < rowsCount; y++) {
    const cells = new Array(colsCount).fill('').map(createCell(y)).join('');

    rows.push(createRow(cells, y + 1));
  }

  return rows.join('');
}
