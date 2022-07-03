import { ActiveRoute } from '@core/router';
import { Page } from '@core';
import { Excel, ExcelHeader, Table, Toolbar, Formula } from '@components';
import { IAppOtions } from '@types';

export class ExcelPage extends Page {
  excel?: Excel;
  firstparam: string;

  constructor(options: IAppOtions) {
    super(options);

    this.firstparam = ActiveRoute.firstParam;
  }

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
