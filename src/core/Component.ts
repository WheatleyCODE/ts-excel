import { WQuery } from '@wquery';
import { WRedux } from '@redux';
import { DomListener } from './DomListener';
import { Emitter, EmitterArg, EventNames } from './Emitter';
import {
  Actions,
  IDashOptions,
  IExcelOptions,
  IState,
  IUnsubscribe,
  StateKeys,
  StateValues
} from '@types';

export abstract class Component extends DomListener {
  public emitter: Emitter;
  private unsubscribers: Array<() => void> = [];
  private wredux: WRedux;
  private unsub!: IUnsubscribe;
  public stringSubs: StateKeys[] | undefined;

  constructor($el: WQuery, options: IDashOptions) {
    super($el, options);
    this.emitter = options.emitter;
    this.wredux = options.wredux;
    this.stringSubs = options.subscribe;

    this.componentWillMount();
  }

  abstract toHTML(): string;

  componentWillMount(): void {
    console.log(this.$root, `${this.options.name} Component will mount`);
  }

  componentDidMount(): void {
    console.log(this.$root, `${this.options.name} Component did mount`);
  }

  componentWilUnmount(): void {
    console.log(this.$root, `${this.options.name} Component Will unmount`);
  }

  emit(eventName: EventNames, arg?: EmitterArg): void {
    this.emitter.emit(eventName, arg);
  }

  on(eventName: EventNames, callback: (a?: EmitterArg) => void): void {
    const unsub = this.emitter.subscribe(eventName, callback);
    this.unsubscribers.push(unsub);
  }

  dispatch(actions: Actions): void {
    this.wredux.dispatch(actions);
  }

  getState(): IState {
    return this.wredux.getState();
  }

  wreduxChanged(changes: { [key: string]: StateValues }): void {
    console.warn('WRedux: dispatch method in Component', changes, this);
  }

  init(): void {
    this.initDOMListeners();
  }

  destroy(): void {
    this.removeDOMListeners();
    this.unsubscribers.forEach((unsub) => unsub());
  }

  setComponentState<X extends object>(newState: X): void {
    throw new Error('Use decorator @stateComponent');
  }

  getComponentState<X extends object>(): X {
    throw new Error('Use decorator @stateComponent');
  }
}
