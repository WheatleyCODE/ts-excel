import { ICellId } from '@types';

class WUtils {
  private methodPrefix = 'on';

  createDOMListenerMethodName(string: string): string {
    return this.methodPrefix + this.capitalize(string);
  }

  capitalize(string: string): string {
    return string[0].toLocaleUpperCase() + string.slice(1);
  }

  parceCellId(id: string): ICellId {
    const [col, row] = id.split(':').map((str) => +str);

    return {
      col,
      row
    };
  }

  storage(key: string, data?: unknown): any {
    if (!data) {
      const storageData = localStorage.getItem(key);
      return storageData ? JSON.parse(storageData) : null;
    }

    localStorage.setItem(key, JSON.stringify(data));
  }
}

export const wutils = new WUtils();
