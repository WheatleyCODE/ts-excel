import { Emitter, Parcer, WReduxSubscriber } from '@core';
import { $, WQuery } from '@wquery';
import { IComponent, IExcelComOptions, IOptions } from '@types';
import { WRedux } from '@redux';

export class Excel {
  private $rootApp: WQuery;
  private components: typeof IComponent[];
  private instantComponents: IComponent[] = [];
  private emitter = new Emitter();
  private wredux: WRedux;
  private wreduxSubscriber: WReduxSubscriber;
  private parcer: Parcer;

  constructor(rootSelector: string, options: IOptions) {
    this.$rootApp = $(rootSelector);
    this.components = options.components;
    this.wredux = options.wredux;
    this.wreduxSubscriber = new WReduxSubscriber(this.wredux);
    this.parcer = new Parcer(this.wredux);
  }

  getRootExcel(): WQuery {
    const $rootExcel = $.create('div', 'excel');

    const componentOptions: IExcelComOptions = {
      emitter: this.emitter,
      wredux: this.wredux,
      parcer: this.parcer
    };

    this.instantComponents = this.components.map((Component) => {
      const $el = $.create('div', Component.classNames);
      const component = new Component($el, componentOptions);

      $el.setHtml(component.toHTML());
      $rootExcel.append($el);

      return component;
    });

    return $rootExcel;
  }

  render(): void {
    this.$rootApp.append(this.getRootExcel());
    this.wreduxSubscriber.subscribeComponents(this.instantComponents);

    this.instantComponents.forEach((instComponent) => {
      instComponent.init();
      instComponent.componentDidMount();
    });
  }

  destroy(): void {
    this.instantComponents.forEach((instComponent) => {
      instComponent.componentWilUnmount();
      instComponent.destroy();
    });

    this.wreduxSubscriber.unsubscribeComponents();

    this.$rootApp.setHtml('');
  }
}
