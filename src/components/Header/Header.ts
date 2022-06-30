import { $, WQuery } from '@wquery';
import { ExcelStateComponent } from '@core';
import { ActiveRoute } from '@routing';
import { IExcelComOptions } from '@types';
import { createHeader } from './header.template';
import { changeOpenDate, changeTitleAC } from '@redux';

export interface IHeaderState {
  openModal: boolean;
}

export class Header extends ExcelStateComponent<IHeaderState> {
  static classNames = ['excel__header', 'excel-header'];

  constructor($el: WQuery, options: IExcelComOptions) {
    super($el, {
      name: 'Header',
      listeners: ['input', 'click'],
      ...options
    });

    this.initComponentState({
      openModal: false
    });
  }

  componentDidMount() {
    super.componentDidMount();
    this.dispatch(changeOpenDate());
  }

  onClick(e: MouseEvent) {
    if (!(e.target instanceof HTMLElement)) return;

    const $target = $(e.target);

    if ($target.data.logo) {
      console.log('object');
      ActiveRoute.navigation('');
    }

    if ($target.data.remove) {
      localStorage.removeItem(`excel:${ActiveRoute.firstParam}`);
      ActiveRoute.navigation('');
    }
  }

  onInput(e: InputEvent) {
    if (!(e.target instanceof HTMLInputElement)) return;
    this.dispatch(changeTitleAC(e.target.value));
  }

  get template() {
    const { title } = this.getState();
    const state = this.getComponentState();
    return createHeader(state, title);
  }

  toHTML(): string {
    return this.template;
  }
}
