import { EventNames, ExcelComponent } from '@core';
import { $, WQuery } from '@wquery';
import { createTable } from './table.template';
import { resizeHandler } from './table.resize';
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

    const $target = $(e.target);
    const id = $target.data.id;
    const { resize, maincoll, mainrow, col, row } = $target.data;

    if (maincoll || mainrow) {
      e.preventDefault();
      this.tableViewApi.selectFullColumnOrRow(col, row);
    }

    if (e.shiftKey && id) {
      e.preventDefault();
      this.tableViewApi.selectGroup(id);
    } else if (id) {
      this.tableViewApi.selectCell(id);
    }

    if (resize) resizeHandler(resize, e.target, this.$root);
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
      this.tableViewApi.focusActiveCell();
    });

    this.on(EventNames.FORMULA_SELECT_ALL, () => {
      this.tableViewApi.selectAllCells();
    });
  }

  toHTML(): string {
    return createTable(30, 30);
  }
}
