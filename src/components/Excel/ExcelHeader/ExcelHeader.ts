import { ActiveRoute, StateComponent } from '@core';
import { ExcelComponent } from '@components';
import { $, WQuery } from '@wquery';
import { changeOpenDate, changeTitleAC, saveCurrentExcelStateAC } from '@redux';
import { IExcelComOptions } from '@types';
import { createExcelHeader } from './excelHeader.template';

export interface IExcelHeaderState {
  openModal: boolean;
}

@StateComponent<IExcelHeaderState>({ openModal: false })
export class ExcelHeader extends ExcelComponent {
  static classNames = ['excel__header', 'excel-header'];

  constructor($el: WQuery, options: IExcelComOptions) {
    super($el, {
      name: 'Header',
      listeners: ['input', 'click'],
      ...options
    });
  }

  componentDidMount() {
    this.dispatch(changeOpenDate());
    this.setComponentState<IExcelHeaderState>({ openModal: true });
  }

  onClick(e: MouseEvent) {
    if (!(e.target instanceof HTMLElement)) return;

    const $target = $(e.target);

    if ($target.data.logo) {
      ActiveRoute.navigation('');
    }

    if ($target.data.out) {
      ActiveRoute.navigation('');
    }
  }

  onInput(e: InputEvent) {
    if (!(e.target instanceof HTMLInputElement)) return;
    this.dispatch(changeTitleAC(e.target.value));
    this.dispatch(saveCurrentExcelStateAC(this.getState().excelState));
  }

  toHTML(): string {
    const { excelState } = this.getState();
    const { title } = excelState;
    const state = this.getComponentState<IExcelHeaderState>();
    return createExcelHeader(state, title);
  }
}
