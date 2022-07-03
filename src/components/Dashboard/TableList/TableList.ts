import { WQuery } from '@wquery';
import { IDashboardComOptions } from '@types';
import { createTableList } from './tableList.tempale';
import { Component } from '@core';
export class TableList extends Component {
  static classNames = ['db__list', 'db-list'];

  constructor($el: WQuery, options: IDashboardComOptions) {
    super($el, {
      name: 'TableList',
      listeners: [],
      ...options
    });
  }

  toHTML(): string {
    return createTableList();
  }
}
