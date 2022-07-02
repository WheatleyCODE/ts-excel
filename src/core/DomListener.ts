import { WQuery } from '@wquery';
import { IDashOptions } from '@types';
import { wutils } from '@utils';

export abstract class DomListener {
  public $root: WQuery;

  constructor($root: WQuery, public options: IDashOptions) {
    if (!$root) throw new Error('No $root privided for DomListener');
    this.$root = $root;
  }

  initDOMListeners(): void {
    this.options.listeners.forEach((listener) => {
      const methodName = wutils.createDOMListenerMethodName(listener);

      if (!this[methodName])
        throw new Error(
          `Method ${methodName} is not inplemented in ${this.options.name} Component`
        );

      this[methodName] = this[methodName].bind(this);

      this.$root.on(listener, this[methodName]);
    });
  }

  removeDOMListeners(): void {
    this.options.listeners.forEach((listener) => {
      this.$root.off(listener);
    });
  }
}
