import { EventNames, ExcelComponent, IFacadeEmitter } from '@core';
import { $, WQuery } from '@wquery';
import { resizeTableAC } from '@redux';
import { createTable } from './table.template';
import { resizeHandler } from './table.resize';
import { TableViewAPI } from './TableViewAPI';
import { IExcelComOptions, IFacadeWredux } from '@types';

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

    if (resize) this.resizeTable(resize, $target);
  }

  async resizeTable(resize: string, $resizer: WQuery): Promise<void> {
    try {
      const resizeTableACOptions = await resizeHandler(resize, $resizer, this.$root);
      this.dispatch(resizeTableAC(resizeTableACOptions));
    } catch (e) {
      console.warn(e.message);
    }
  }

  onKeydown(e: KeyboardEvent): void {
    this.tableViewApi.onKeydownHandler(e);
  }

  onInput(): void {
    this.tableViewApi.onInputHandler();
  }

  componentDidMount(): void {
    super.componentDidMount();

    const miniEmitter: IFacadeEmitter = {
      on: this.on.bind(this),
      emit: this.emit.bind(this)
    };

    const miniWRedux: IFacadeWredux = {
      dispatch: this.dispatch.bind(this),
      getState: this.getState.bind(this)
    };

    this.tableViewApi = new TableViewAPI(this.$root, miniEmitter, miniWRedux);

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
    return createTable(30, 30, this.getState());
  }
}
