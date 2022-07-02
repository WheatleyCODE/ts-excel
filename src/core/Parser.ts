import { WRedux, changeParserData } from '@redux';
import { Emitter, EventNames } from './Emitter';

type TypeParser = 'output' | 'input';
export class Parser {
  private firstSymbol = '=';
  private cellsData = {};

  constructor(private wredux: WRedux, private emitter: Emitter) {
    this.emitter.subscribe(EventNames.TABLE_PARSER_ID, (string) => {
      if (typeof string !== 'string') return;
      const [id, text] = string.split('|');
      this.cellsData[id] = text;
    });
  }

  checkCells(string: string): string[] {
    const str = string.replace(/\s/g, '');

    if (!str.startsWith(this.firstSymbol)) {
      return [];
    }

    const strFormula = str.slice(1);
    const arr = strFormula.split(/[+-/*/(/)]/).filter((str) => str !== '');
    const res: string[] = [];

    arr.forEach((str) => {
      if (isNaN(Number(str))) {
        const STR = str.toUpperCase();
        res.push(STR);
      }
    });

    return res;
  }

  parse(string: string, type: TypeParser, cellId?: string): string {
    const str = string.replace(/\s/g, '');

    if (!str.startsWith(this.firstSymbol)) {
      if (cellId) this.wredux.dispatch(changeParserData(cellId, str, str));

      return string;
    }

    let strFormula = str.slice(1);
    let res: number;

    const arr = strFormula.split(/[+-/*/(/)]/).filter((str) => str !== '');

    let err = false;

    arr.forEach((str) => {
      if (isNaN(Number(str))) {
        const STR = str.toUpperCase();
        this.emitter.emit(EventNames.PARSER_CHECK_CELL, STR);

        if (this.cellsData[STR]) {
          strFormula = strFormula.replace(str, this.cellsData[STR]);
          return;
        }

        err = true;
      }
    });

    if (err) {
      if (cellId) this.wredux.dispatch(changeParserData(cellId, string, string));
      this.emitter.emit(EventNames.PARSER_CLEAR_FORMULA_SELECT);
      return string;
    }

    try {
      res = eval(strFormula);
    } catch {
      if (cellId) this.wredux.dispatch(changeParserData(cellId, string, string));
      return string;
    }

    if (cellId) this.wredux.dispatch(changeParserData(cellId, str, `${res || ''}`));

    if (type === 'input') return str;

    if (type === 'output') return `${res || ''}`;

    return string;
  }
}
