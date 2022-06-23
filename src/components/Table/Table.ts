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
      listeners: ['mousedown', 'keydown', 'input'],
      ...options
    });
  }

  onMousedown(e: MouseEvent): void {
    if (!(e.target instanceof HTMLDivElement)) return;
    e.preventDefault();

    const $target = $(e.target);
    const id = $target.data.id;
    const resType = $target.data.resize;

    if ($target.data.maincoll || $target.data.mainrow) {
      this.tableViewApi.selectFullColumnOrRow($target.data.row, $target.data.col);
    }

    if (e.shiftKey && id) {
      this.tableViewApi.selectGroup(id);
    } else if (id) {
      this.tableViewApi.select(id);
    }

    if (resType) resize(resType, e.target, this.$root);
  }

  onKeydown(e: KeyboardEvent): void {
    this.tableViewApi.onKeydownHandler(e);
  }

  onInput() {
    this.tableViewApi.onInputHandler();
  }

  componentDidMount(): void {
    super.componentDidMount();

    const miniEmitter = {
      on: this.on.bind(this),
      emit: this.emit.bind(this)
    };

    this.tableViewApi = new TableViewAPI(this.$root, miniEmitter);

    this.on(EventNames.FORMULA_INPUT, (string) => {
      if (typeof string === 'string') {
        this.tableViewApi.changeText(string);
      }
    });

    this.on(EventNames.FORMULA_TAB_OR_ENTER_PRESS, () => {
      this.tableViewApi.selectActiveCell();
    });

    this.on(EventNames.FORMULA_SELECT_ALL, () => {
      this.tableViewApi.selectAll();
    });
  }

  toHTML(): string {
    return createTable(30, 120);
  }
}
