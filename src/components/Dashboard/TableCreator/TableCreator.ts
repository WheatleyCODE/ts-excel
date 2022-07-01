import { WQuery } from '@wquery';
import { IDashboardComOptions } from '@types';
import { createTableCreator } from './tableCreator.template';
import { Component } from '@core';

export class TableCreator extends Component {
  static classNames = ['db__create', 'db-create'];

  constructor($el: WQuery, options: IDashboardComOptions) {
    super($el, {
      name: 'TableCreator',
      listeners: [],
      ...options
    });
  }

  toHTML(): string {
    return createTableCreator();
  }
}
