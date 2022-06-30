import { WQuery } from '@wquery';
import { IExcelComOptions, StateValues } from '@types';
import { createHeader } from './header.template';
import { ExcelStateComponent } from '@core/ExcelStateComponent';
import { changeTitleAC } from '@redux';

export interface IHeaderState {
  openModal: boolean;
}

export class Header extends ExcelStateComponent<IHeaderState> {
  static classNames = ['excel__header', 'excel-header'];

  constructor($el: WQuery, options: IExcelComOptions) {
    super($el, {
      name: 'Header',
      listeners: ['input'],
      ...options
    });

    this.initComponentState({
      openModal: false
    });
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
