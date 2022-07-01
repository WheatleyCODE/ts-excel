import { WQuery } from '@wquery';
import { IDashboardComOptions } from '@types';
import { createDHeader } from './dheader.template';
import { Component } from '@core';

export class DHeader extends Component {
  static classNames = ['db__header', 'db-header'];

  constructor($el: WQuery, options: IDashboardComOptions) {
    super($el, {
      name: 'DHeader',
      listeners: [],
      ...options
    });
  }

  toHTML(): string {
    return createDHeader();
  }
}
