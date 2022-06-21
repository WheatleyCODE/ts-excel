import { ExcelComponent } from '@core';
import { $, WQuery } from '@wquery';
import { createTable } from './table.template';
import { resize } from './table.resize';
import { TableViewAPI } from './TableViewAPI';

export class Table extends ExcelComponent {
  static classNames = ['excel__table', 'excel-table'];
  private tableViewApi: TableViewAPI | undefined;

  constructor($el: WQuery) {
    super($el, {
      name: 'Table',
      listeners: ['mousedown']
    });
  }

  onMousedown(e: MouseEvent): void {
    if (!(e.target instanceof HTMLDivElement)) return;
    if (!this.tableViewApi) return;
    e.preventDefault();

    const $target = $(e.target);
    const id = $target.data.id;
    const resType = $target.data.resize;

    if (e.shiftKey && id) {
      this.tableViewApi.selectGroup(id);
    } else if (id) {
      this.tableViewApi.select(id);
    }

    if (resType) resize(resType, e.target, this.$root);
  }

  componentDidMount() {
    super.componentDidMount();
    this.tableViewApi = new TableViewAPI(this.$root);
  }

  toHTML(): string {
    return createTable(60, 30);
  }
}
