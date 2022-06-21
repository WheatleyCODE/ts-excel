import { $, WQuery } from '@wquery';
import { IComponent, IOptions } from '@types';

export class Excel {
  private $rootApp: WQuery;
  private components: typeof IComponent[];
  private instantComponents: IComponent[] = [];

  constructor(rootSelector: string, options: IOptions) {
    this.$rootApp = $(rootSelector);
    this.components = options.components;
  }

  getRootExcel(): WQuery {
    const $rootExcel = $.create('div', 'excel');

    this.instantComponents = this.components.map((Component) => {
      const $el = $.create('div', Component.classNames);
      const component = new Component($el);

      $el.setHtml(component.toHTML());
      $rootExcel.append($el);

      return component;
    });

    return $rootExcel;
  }

  render(): void {
    this.$rootApp.append(this.getRootExcel());
    this.instantComponents.forEach((instComponent) => {
      instComponent.init();
      instComponent.componentDidMount();
    });
  }

  removeComponents(): void {
    this.instantComponents.forEach((instComponent) => {
      instComponent.componentWilUnmount();
      instComponent.destroy();
    });

    this.$rootApp.setHtml('');
  }
}
