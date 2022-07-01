import { IComponent } from '@types';

export function stateComponent<X extends object>(initialState: X) {
  function Decorator<T extends { new (...args: any[]): IComponent }>(constructor: T) {
    return class extends constructor {
      private state: X = initialState;

      setComponentState<J>(newState: any): void {
        this.state = { ...newState };
        this.$root.setHtml(this.toHTML());
      }

      getComponentState<J>(): any {
        if (!this.state) {
          throw new Error(`State not initialized in ${this.options.name} Component`);
        }

        return { ...this.state };
      }
    };
  }

  return Decorator;
}
