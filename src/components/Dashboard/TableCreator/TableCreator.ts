import { createTableAC, createTablePreserAC } from './../../../redux/actionCreators';
import { $, WQuery } from '@wquery';
import { IDashboardComOptions, presetInvest } from '@types';
import { createTableCreator } from './tablecreator.template';
import { ActiveRoute, Component } from '@core';

export class TableCreator extends Component {
  static classNames = ['db__create', 'db-create'];

  constructor($el: WQuery, options: IDashboardComOptions) {
    super($el, {
      name: 'TableCreator',
      listeners: ['click'],
      ...options
    });
  }

  onClick(e: MouseEvent) {
    if (!(e.target instanceof HTMLElement)) return;
    const $target = $(e.target);
    const id = Date.now().toString();

    if ($target.data.createTable) {
      ActiveRoute.navigation(`#excel/${id}`);
      this.dispatch(createTableAC(Number(id)));
    }

    if ($target.data.createIvest) {
      ActiveRoute.navigation(`#excel/${id}`);
      this.dispatch(createTablePreserAC(Number(id), presetInvest));
    }
  }

  toHTML(): string {
    return createTableCreator();
  }
}
