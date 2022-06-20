const CODES = {
  A: 65,
  Z: 90
};

function createCell() {
  return `
    <div contenteditable class="data__cell"></div>
  `;
}

function createCol(letter: string) {
  return `
    <div class="data__column">
      ${letter}
    </div>
  `;
}

function createRow(cols = '', i: string | number = '') {
  return `
    <div class="excel-table__row row">
      <div class="row__info">${i}</div>
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

  const cells = new Array(colsCount).fill('').map(createCell).join('');

  rows.push(createRow(cols.join('')));

  for (let i = 0; i < rowsCount; i++) {
    rows.push(createRow(cells, i + 1));
  }

  return rows.join('');
}
