export class Storage {
  get(key: string): any | null {
    const storageData = localStorage.getItem(key);
    return storageData ? JSON.parse(storageData) : null;
  }

  set(key: string, data: string | object | number): void {
    localStorage.setItem(key, JSON.stringify(data));
  }

  key(i: number): string | null {
    return localStorage.key(i);
  }

  get length(): number {
    return localStorage.length;
  }
}

export const storage = new Storage();
