import { ActiveRoute, Emitter, Parser, WReduxSubscriber } from '@core';
import { $, WQuery } from '@wquery';
import { IExcelComponent, IExcelComOptions, IExcOptions } from '@types';
import { saveCurrentExcelStateAC, setCurrentExcelStateAC, WRedux } from '@redux';

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

  setExcelStateFromId() {
    const dState = this.wredux.getState().dashboardState;
    const id = ActiveRoute.firstParam;
    const current = dState.excels.find((excel) => excel.id === +id);

    if (current) {
      this.wredux.dispatch(setCurrentExcelStateAC(current));
      return;
    }

    ActiveRoute.navigation('');
  }

  saveExcelStateFromId() {
    const excelState = this.wredux.getState().excelState;
    this.wredux.dispatch(saveCurrentExcelStateAC(excelState));
  }

  getRootExcel(): WQuery {
    this.setExcelStateFromId();
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
    this.saveExcelStateFromId();
    this.instantComponents.forEach((instComponent) => {
      instComponent.componentWilUnmount();
      instComponent.destroy();
    });

    this.wreduxSubscriber.unsubscribeComponents();
  }
}
