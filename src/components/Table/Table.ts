import { ExcelComponent } from '@core';
import { WQuery } from '@wquery';
import { createTable } from './table.template';
import { resize } from './table.resize';

export class Table extends ExcelComponent {
  static classNames = ['excel__table', 'excel-table'];

  constructor($el: WQuery) {
    super($el, {
      name: 'Table',
      listeners: ['mousedown']
    });
  }

  onMousedown(e: MouseEvent): void {
    if (!(e.target instanceof HTMLDivElement)) return;

    const resType = e.target.dataset.resize;
    if (!resType) return;

    resize(resType, e.target, this.$root);
  }

  toHTML(): string {
    return createTable(60, 30);
  }
}
