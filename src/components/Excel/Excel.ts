import { Emitter, Parser, WReduxSubscriber } from '@core';
import { $, WQuery } from '@wquery';
import { IExcelComponent, IExcelComOptions, IExcOptions } from '@types';
import { WRedux } from '@redux';

export class Excel {
  private components: typeof IExcelComponent[];
  private instantComponents: IExcelComponent[] = [];
  private wredux: WRedux;
  private wreduxSubscriber: WReduxSubscriber;
  private emitter: Emitter;
  private parser: Parser;

  constructor(options: IExcOptions) {
    this.components = options.components;
    this.wredux = options.wredux;
    this.wreduxSubscriber = options.wreduxSubscriber;
    this.emitter = options.emitter;
    this.parser = new Parser(this.wredux, this.emitter);
  }

  getRootExcel(): WQuery {
    const $rootExcel = $.create('div', 'excel');

    const componentOptions: IExcelComOptions = {
      emitter: this.emitter,
      wredux: this.wredux,
      parser: this.parser
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
