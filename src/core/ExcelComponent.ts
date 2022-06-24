import { WQuery } from '@wquery';
import { WRedux } from '@redux';
import { DomListener } from './DomListener';
import { Emitter, EmitterArg, EventNames } from './Emitter';
import { Actions, IComOptions, IState, IUnsubscribe } from '@types';

export abstract class ExcelComponent extends DomListener {
  public emitter: Emitter;
  private unsubscribers: Array<() => void> = [];
  private wredux: WRedux;
  private unsub = {} as IUnsubscribe;

  constructor($el: WQuery, options: IComOptions) {
    super($el, options);
    this.emitter = options.emitter;
    this.wredux = options.wredux;
  }

  abstract toHTML(): string;

  componentDidMount() {
    console.log(this.$root, `${this.options.name} Component did mount`);
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

  subscribe(callback: (state: IState) => void): void {
    this.unsub = this.wredux.subscribe(callback);
  }

  componentWilUnmount(): void {
    console.log(this.$root, `${this.options.name} Component Will unmount`);
  }

  init(): void {
    this.initDOMListeners();
  }

  destroy(): void {
    this.removeDOMListeners();
    this.unsubscribers.forEach((unsub) => unsub());
  }
}
