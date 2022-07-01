import { IExcelComponent } from '@types';

export function stateComponent<X extends object>(initialState: X) {
  function Decorator<T extends { new (...args: any[]): IExcelComponent }>(constructor: T) {
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
