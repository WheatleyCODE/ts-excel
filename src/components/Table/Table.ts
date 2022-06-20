import { ExcelComponent } from '@core';
import { WQuery } from '@wquery';
import { createTable } from './table.template';

export class Table extends ExcelComponent {
  static classNames = ['excel__table', 'excel-table'];

  constructor($el: WQuery) {
    super($el, {
      name: 'Table',
      listeners: []
    });
  }

  toHTML() {
    return createTable(60, 30);
  }
}
