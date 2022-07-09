import { $, WQuery } from '@wquery';
import { ICombinedState, IDashboardComOptions, IExcelState } from '@types';
import { createTableList } from './tablelist.template';
import { Component, StateComponent } from '@core';
import { removeCurrentExcelStateAC } from '@redux';

export interface ITableListState {
  excels: IExcelState[];
}
@StateComponent<ITableListState>({ excels: [] })
export class TableList extends Component {
  static classNames = ['db__list', 'db-list'];

  constructor($el: WQuery, options: IDashboardComOptions) {
    super($el, {
      name: 'TableList',
      listeners: ['click'],
      subscribe: { state: 'dashboardState', value: ['excels'] },
      ...options
    });
  }

  componentDidMount(): void {
    const excels = this.getState().dashboardState.excels;
    this.setComponentState<ITableListState>({ excels: [...excels] });
  }

  wreduxChanged(changes: ICombinedState): void {
    const { excels } = changes.dashboardState;
    this.setComponentState<ITableListState>({ excels: [...excels] });
  }

  onClick(e: MouseEvent) {
    if (!(e.target instanceof HTMLElement)) return;
    const $target = $(e.target);
    const id = $target.data.deleteId;

    if (id) {
      e.preventDefault();
      const { excels } = this.getComponentState<ITableListState>();
      const currentExcel = excels.find((excel) => excel.id === +id);
      const isDel = window.confirm(`Вы действительно хотите удалить: ${currentExcel?.title}`);

      if (isDel) {
        this.dispatch(removeCurrentExcelStateAC(Number(id)));
      }
    }
  }

  toHTML(): string {
    const { excels } = this.getComponentState<ITableListState>();
    return createTableList(excels);
  }
}
