import { WQuery } from '@wquery';
import { IComOptions } from '@types';
import { DomListener } from './DomListener';

export abstract class ExcelComponent extends DomListener {
  constructor($el: WQuery, options: IComOptions = { name: 'ExcelComponent', listeners: [] }) {
    super($el, options);
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
