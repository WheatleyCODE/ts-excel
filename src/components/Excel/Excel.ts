import { ExcelComponent } from '@core';
import { IOptions } from '@types';

export class Excel {
  private $el: Element;
  private components: ExcelComponent[];

  constructor(private rootSelector: string, private options: IOptions) {
    const rootNode = document.querySelector(rootSelector);

    if (!rootNode) throw new Error('Root element is not found');

    this.$el = rootNode;
    this.components = options.components;
  }

  log() {
    console.log(this.rootSelector);
    console.log(this.options);
    console.log(this.$el);
    console.log(this.components);

    this.components.forEach((co) => console.log(co.toHTML(), 'One'));
  }
}
