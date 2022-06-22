export enum EventNames {
  FORMULA_INPUT = 'formula:input',
  TABLE_CELECT_CELL = 'table:select-cell'
}

export class Emitter {
  private subscribers: { [propName: string]: Array<(a?: string | number) => void> } = {};

  emit(eventName: EventNames, arg?: string | number): void {
    if (Array.isArray(this.subscribers[eventName])) {
      this.subscribers[eventName].forEach((callback) => callback(arg));
    }
  }

  subscribe(eventName: EventNames, callback: (a?: string | number) => void): () => void {
    this.subscribers[eventName] = this.subscribers[eventName] || [];
    this.subscribers[eventName].push(callback);

    return () => {
      this.subscribers[eventName] = this.subscribers[eventName].filter((fn) => fn !== callback);
    };
  }
}
