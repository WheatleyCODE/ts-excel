import { $, WQuery } from '@wquery';
import { IComponent, IOptions } from '@types';

export class Excel {
  private $el: WQuery;
  private components: typeof IComponent[];

  constructor(private rootSelector: string, private options: IOptions) {
    this.$el = $(rootSelector);
    this.components = options.components;
  }

  getRoot(): WQuery {
    const $root = $.create('div', 'excel');

    this.components.forEach((Component) => {
      const $el = $.create('div', Component.classNames);
      const component = new Component($el);

      $el.html(component.toHTML());
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
