import { Page } from '@core';
import { Excel, Header, Table, Toolbar, Formula } from '@components';

export class ExcelPage extends Page {
  excel?: Excel;

  getRoot() {
    console.log(this.options, 'this.options');

    this.excel = new Excel({
      components: [Header, Toolbar, Formula, Table],
      ...this.options
    });

    return this.excel.getRootExcel();
  }

  initPage() {
    this.excel?.init();
  }

  destroyPage() {
    this.excel?.destroy();
  }
}
