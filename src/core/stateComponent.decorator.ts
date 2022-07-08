import { Component } from './Component';

export function StateComponent<X extends object>(initialState: X) {
  function Decorator<T extends { new (...args: any[]): Component }>(constructor: T) {
    return class extends constructor {
      private state: X = initialState;

      setComponentState<J>(newState: any): void {
        this.state = { ...newState };
        this.$root.setHtml(this.toHTML());
      }

      getComponentState<J>(): any {
        return { ...this.state };
      }
    };
  }

  return Decorator;
}
