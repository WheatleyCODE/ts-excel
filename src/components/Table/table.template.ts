import { CODES, MAX_LENGTH } from '@types';

function createCell(rowNumber: number): (_: string, i: number) => string {
  return (_: string, i: number): string => {
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

function createCol(letter: string, i: number): string {
  return `
    <div data-type="resizable" data-maincoll="true" data-col="${i}" class="data__column">
      ${letter}
      <div data-resize="col" class="data__col-resize col-resize"></div>
    </div>
  `;
}

function createRow(cols = '', i: string | number = ''): string {
  const resizer = i ? '<div data-resize="row" class="row__row-resize row-resize"></div>' : '';
  return `
    <div data-row="${i}" data-type="resizable" class="excel-table__row row">
      <div data-mainrow="true" data-row="${i}" class="row__info">${i} ${resizer}</div>
      <div class="row__data data">${cols}</div>
    </div>
  `;
}

function toCharCode(): () => string {
  let count = -1;
  let repeat = 1;

  return () => {
    count++;

    if (count > MAX_LENGTH) {
      repeat++;
      count = 0;
    }

    return String.fromCharCode(CODES.A + count).repeat(repeat);
  };
}

export function createTable(rowsCount = 60, colsCount = 30): string {
  const rows = [];
  const cols = new Array(colsCount).fill('').map(toCharCode()).map(createCol).join('');

  rows.push(createRow(cols));

  for (let i = 0; i < rowsCount; i++) {
    const cells = new Array(colsCount).fill('').map(createCell(i)).join('');
    rows.push(createRow(cells, i + 1));
  }

  return rows.join('');
}
