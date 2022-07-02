import { WQuery } from '@wquery';
import { IDashboardComOptions } from '@types';
import { createDashHeader } from './dashHeader.template';
import { Component } from '@core';

export class DashHeader extends Component {
  static classNames = ['db__header', 'db-header'];

  constructor($el: WQuery, options: IDashboardComOptions) {
    super($el, {
      name: 'DHeader',
      listeners: [],
      ...options
    });
  }

  toHTML(): string {
    return createDashHeader();
  }
}
