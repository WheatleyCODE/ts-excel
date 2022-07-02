import { WQuery } from '@wquery';
import { WRedux } from '@redux';
import { DomListener } from './DomListener';
import { Emitter, EmitterArg, EventNames } from './Emitter';
import { Actions, ICombinedState, IDashOptions, IStringSub, IUnsubscribe } from '@types';

export abstract class Component extends DomListener {
  public emitter: Emitter;
  private unsubscribers: Array<() => void> = [];
  private wredux: WRedux;
  private unsub!: IUnsubscribe;
  public strSubs: IStringSub | undefined;

  constructor($el: WQuery, options: IDashOptions) {
    super($el, options);
    this.emitter = options.emitter;
    this.wredux = options.wredux;
    this.strSubs = options.subscribe;

    this.componentWillMount();
  }

  abstract toHTML(): string;

  componentWillMount(): void {}

  componentDidMount(): void {}

  componentWilUnmount(): void {}

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

  getState(): ICombinedState {
    return this.wredux.getState();
  }

  wreduxChanged(changes: ICombinedState): void {
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
