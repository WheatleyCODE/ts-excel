export enum EventNames {
  FORMULA_INPUT = 'formula:input',
  TABLE_CELECT_CELL = 'table:select-cell',
  TABLE_INPUT = 'table:input',
  FORMULA_TAB_OR_ENTER_PRESS = 'formula:tab-or-enter-press'
}

export interface IFacadeEmitter {
  on: (eventName: EventNames, callback: (a?: EmitterArg) => void) => void;
  emit: (eventName: EventNames, arg?: EmitterArg) => void;
}

export type EmitterArg = string | number | undefined;

export class Emitter {
  private subscribers: { [propName: string]: Array<(a?: EmitterArg) => void> } = {};

  emit(eventName: EventNames, arg?: EmitterArg): void {
    if (Array.isArray(this.subscribers[eventName])) {
      this.subscribers[eventName].forEach((callback) => callback(arg));
    }
  }

  subscribe(eventName: EventNames, callback: (a?: EmitterArg) => void): () => void {
    this.subscribers[eventName] = this.subscribers[eventName] || [];
    this.subscribers[eventName].push(callback);

    return () => {
      this.subscribers[eventName] = this.subscribers[eventName].filter((fn) => fn !== callback);
    };
  }
}