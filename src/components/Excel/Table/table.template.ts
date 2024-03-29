import {
  CODES,
  defaultToolbarStyles,
  DEFAULT_HEGHT,
  DEFAULT_WIDTH,
  IExcelState,
  IWithWidthFromOptions,
  MAX_LENGTH
} from '@types';
import { wutils } from '@utils';

function createCell(rowNum: number, state: IExcelState): (optons: IWithWidthFromOptions) => string {
  return ({ letter, index, width }: IWithWidthFromOptions): string => {
    const id = `${index}:${rowNum}`;
    let text = state.cellsDataState[id];

    if (state.parserData[id]) {
      text = state.parserData[id].result;
    }

    let styles = { ...defaultToolbarStyles };
    const storageStyles = state.cellsStylesState[`${index}:${rowNum}`];

    if (storageStyles) {
      styles = { ...styles, ...storageStyles };
    }

    const stylesArr = Object.keys(styles).map(
      (key) => `${wutils.camelCaseToDashCase(key)}: ${styles[key]}; `
    );

    return `
      <div contenteditable
        style="width: ${width}px; ${stylesArr.join(' ')}"
        data-col="${index}"
        data-col-public="${letter}"
        data-row="${rowNum}"
        data-id="${index}:${rowNum}"
        data-id-public="${letter}${rowNum}"
        class="data__cell">
        ${text || ''}
        <hr class="selection-el" data-selection="true" />
      </div>
    `;
  };
}

function createCol({ letter, index, width }: IWithWidthFromOptions): string {
  return `
    <div
      style="width: ${width}px"
      data-type="resizable"
      data-maincoll="true" 
      data-col-public="${letter}"
      data-col="${index}"
      class="data__column"
    >
      ${letter}
      <div data-resize="col" class="data__col-resize col-resize"></div>
    </div>
  `;
}

function createRowWithHeightFrom(state: IExcelState): (cols: string, i?: number) => string {
  return (cols: string, i?: number): string => {
    if (i) {
      const heigh = getHeight(state, i);

      return `
        <div
          style="height:${heigh}px"
          ${i && `data-row="${i}"`}
          ${i && 'data-type="resizable"'}
          class="excel-table__row row"
        >
          <div data-mainrow="true" data-row="${i}" class="row__info">
            ${i}
            <div data-resize="row" class="row__row-resize row-resize"></div>
          </div>
          <div class="row__data data">${cols}</div>
        </div>
      `;
    }

    return `
        <div class="excel-table__row row">
          <div class="row__info"></div>
          <div class="row__data data">${cols}</div>
        </div>
      `;
  };
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

function getWidth(state: IExcelState, i: number): number {
  return state.resizeState.col[i] || DEFAULT_WIDTH;
}

function getHeight(state: IExcelState, i: number): number {
  return state.resizeState.row[i] || DEFAULT_HEGHT;
}

function withWidthFrom(state: IExcelState): (letter: string, i: number) => IWithWidthFromOptions {
  return (letter: string, index: number): IWithWidthFromOptions => {
    index++;

    return {
      letter,
      index,
      width: getWidth(state, index)
    };
  };
}

export function createTable(rowsCount = 60, colsCount = 30, state: IExcelState): string {
  const rows = [];
  const cols = new Array(colsCount)
    .fill('')
    .map(toCharCode())
    .map(withWidthFrom(state))
    .map(createCol)
    .join('');

  rows.push(createRowWithHeightFrom(state)(cols));

  for (let i = 1; i <= rowsCount; i++) {
    const cells = new Array(colsCount)
      .fill('')
      .map(toCharCode())
      .map(withWidthFrom(state))
      .map(createCell(i, state))
      .join('');

    rows.push(createRowWithHeightFrom(state)(cells, i));
  }

  return rows.join('');
}
