import { Emitter, WReduxSubscriber } from '@core';
import { $, WQuery } from '@wquery';
import { IDashboardComOptions, IDashComponent, IDasOptions } from '@types';
import { WRedux } from '@redux';

export class Dashboard {
  private components: typeof IDashComponent[];
  private instantComponents: IDashComponent[] = [];
  private wredux: WRedux;
  private wreduxSubscriber: WReduxSubscriber;
  private emitter: Emitter;

  constructor(options: IDasOptions) {
    this.components = options.components;
    this.wredux = options.wredux;
    this.wreduxSubscriber = options.wreduxSubscriber;
    this.emitter = options.emitter;
  }

  getRootDashboard(): WQuery {
    const $rootExcel = $.create('div', 'db');

    const componentOptions: IDashboardComOptions = {
      emitter: this.emitter,
      wredux: this.wredux
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

  init(): void {
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
  }
}
