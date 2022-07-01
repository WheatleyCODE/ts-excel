import { ExcelComponent } from '@components/Excel/ExcelComponent';
import { $, WQuery } from '@wquery';
import { ActiveRoute, stateComponent } from '@core';
import { IExcelComOptions } from '@types';
import { createHeader } from './header.template';
import { changeOpenDate, changeTitleAC } from '@redux';

export interface IHeaderState {
  openModal: boolean;
}

@stateComponent<IHeaderState>({ openModal: false })
export class Header extends ExcelComponent {
  static classNames = ['excel__header', 'excel-header'];

  constructor($el: WQuery, options: IExcelComOptions) {
    super($el, {
      name: 'Header',
      listeners: ['input', 'click'],
      ...options
    });
  }

  componentDidMount() {
    super.componentDidMount();
    this.dispatch(changeOpenDate());
    this.setComponentState<IHeaderState>({ openModal: true });
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

  toHTML(): string {
    const { title } = this.getState();
    const state = this.getComponentState<IHeaderState>();
    return createHeader(state, title);
  }
}
