import { $ } from '@wquery';
import { IComponent, IOptions } from '@types';

export class Excel {
  private $el: Element;
  private components: typeof IComponent[];

  constructor(private rootSelector: string, private options: IOptions) {
    const rootNode = document.querySelector(rootSelector);

    if (!rootNode) throw new Error('Root element is not found');

    this.$el = rootNode;
    this.components = options.components;
  }

  getRoot(): HTMLElement {
    const $root = $.create('div', 'excel');

    this.components.forEach((Component) => {
      const $el = $.create('div', Component.classNames);
      const component = new Component($el);

      $el.innerHTML = component.toHTML();
      $root.append($el);
    });

    return $root;
  }

  render(): void {
    this.$el.append(this.getRoot());
  }

  log(): void {
    console.log(this.rootSelector);
    console.log(this.options);
    console.log(this.$el);
    console.log(this.components);
  }
}
