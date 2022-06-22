import { EventNames, ExcelComponent } from '@core';
import { $, WQuery } from '@wquery';
import { createTable } from './table.template';
import { resize } from './table.resize';
import { TableViewAPI } from './TableViewAPI';
import { IExcelComOptions } from '@types';

export class Table extends ExcelComponent {
  static classNames = ['excel__table', 'excel-table'];
  private tableViewApi!: TableViewAPI;

  constructor($el: WQuery, options: IExcelComOptions) {
    super($el, {
      name: 'Table',
      listeners: ['mousedown', 'keydown'],
      ...options
    });
  }

  onMousedown(e: MouseEvent): void {
    if (!(e.target instanceof HTMLDivElement)) return;

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

  componentDidMount(): void {
    super.componentDidMount();
    this.tableViewApi = new TableViewAPI(this.$root, this.emitter);

    this.emitter.subscribe(EventNames.FORMULA_INPUT, (string) => {
      if (typeof string === 'string') {
        this.tableViewApi.changeText(string);
      }
    });
  }

  onKeydown(e: KeyboardEvent): void {
    this.tableViewApi.onKeydownHandler(e);
  }

  toHTML(): string {
    return createTable(60, 30);
  }
}
