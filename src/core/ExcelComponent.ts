import { WQuery } from '@wquery';
import { DomListener } from './DomListener';
import { Emitter } from './Emitter';
import { IComOptions } from '@types';

export abstract class ExcelComponent extends DomListener {
  public emitter: Emitter;

  constructor($el: WQuery, options: IComOptions) {
    super($el, options);
    this.emitter = options.emitter;
  }

  abstract toHTML(): string;

  componentDidMount() {
    console.log(this.$root, `${this.options.name} Component did mount`);
  }

  componentWilUnmount() {
    console.log(this.$root, `${this.options.name} Component Will unmount`);
  }

  init() {
    this.initDOMListeners();
  }

  destroy() {
    this.removeDOMListeners();
  }
}
