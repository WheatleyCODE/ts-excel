import { Page } from '@core';
import { Excel, ExcelHeader, Table, Toolbar, Formula } from '@components';

export class ExcelPage extends Page {
  excel?: Excel;

  getRoot() {
    this.excel = new Excel({
      components: [ExcelHeader, Toolbar, Formula, Table],
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
