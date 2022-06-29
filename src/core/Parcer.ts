import { WRedux, changeParcerData } from '@redux';

export class Parcer {
  constructor(private wredux: WRedux) {}

  parce(string: string, id: 'output' | 'input', cellId?: string): string {
    const str = string.replace(/\s/g, '');

    if (!str.startsWith('=')) {
      if (cellId) {
        this.wredux.dispatch(changeParcerData(cellId, str, str));
      }

      return string;
    }

    const strFormula = str.slice(1);
    if (strFormula === '' || strFormula.length < 3) return string;
    let res: number;

    try {
      res = eval(strFormula);
    } catch {
      return string;
    }

    if (cellId) {
      this.wredux.dispatch(changeParcerData(cellId, str, `${res}`));
    }

    if (id === 'input') {
      return str;
    }

    if (id === 'output') {
      return `${res}`;
    }

    return string;
  }
}
