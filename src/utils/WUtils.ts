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

  parceStyleValueToInt(str: string): number {
    if (str.endsWith('px')) {
      const value = str.slice(0, -2);

      return +value;
    }

    return +str;
  }

  storage(key: string, data?: unknown): any {
    if (!data) {
      const storageData = localStorage.getItem(key);
      return storageData ? JSON.parse(storageData) : null;
    }

    localStorage.setItem(key, JSON.stringify(data));
  }

  isEqual(a: string | number | object, b: string | number | object): boolean {
    if (typeof a === 'object' && typeof a === 'object') {
      return JSON.stringify(a) === JSON.stringify(b);
    }

    return a === b;
  }

  camelCaseToDashCase(str: string): string {
    return str.replace(/([A-Z])/g, (g) => `-${g[0].toLowerCase()}`);
  }

  debounse(fn: (...args: any[]) => void, wait: number) {
    let timeout: NodeJS.Timeout;

    return function (...args: any[]) {
      const later = () => {
        clearTimeout(timeout);
        fn(...args);
      };

      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }
}

export const wutils = new WUtils();
