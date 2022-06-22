import { WQuery } from '@wquery';
import { DomListener } from './DomListener';
import { Emitter, EmitterArg, EventNames } from './Emitter';
import { IComOptions } from '@types';

export abstract class ExcelComponent extends DomListener {
  public emitter: Emitter;
  private unsubscribers: Array<() => void> = [];

  constructor($el: WQuery, options: IComOptions) {
    super($el, options);
    this.emitter = options.emitter;
  }

  abstract toHTML(): string;

  componentDidMount() {
    console.log(this.$root, `${this.options.name} Component did mount`);
  }

  emit(eventName: EventNames, arg?: EmitterArg) {
    this.emitter.emit(eventName, arg);
  }

  on(eventName: EventNames, callback: (a?: EmitterArg) => void) {
    const unsub = this.emitter.subscribe(eventName, callback);
    this.unsubscribers.push(unsub);
  }

  componentWilUnmount() {
    console.log(this.$root, `${this.options.name} Component Will unmount`);
  }

  init() {
    this.initDOMListeners();
  }

  destroy() {
    this.removeDOMListeners();
    this.unsubscribers.forEach((unsub) => unsub());
  }
}
