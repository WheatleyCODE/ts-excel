import { ICellId } from '@types';

class WUtils {
  private methodPrefix = 'on';

  createDOMListenerMethodName(string: string) {
    return this.methodPrefix + this.capitalize(string);
  }

  capitalize(string: string) {
    return string[0].toLocaleUpperCase() + string.slice(1);
  }

  parceCellId(id: string): ICellId {
    const [row, col] = id.split(':').map((str) => +str);

    return {
      col,
      row
    };
  }
}

export const wutils = new WUtils();
