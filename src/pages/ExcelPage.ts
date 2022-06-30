import { Page } from '@core';
import { initialState, rootReducer, WRedux } from '@redux';
import { Excel, Header, Table, Toolbar, Formula } from '@components';
import { wutils } from '@utils';
import { IState, STORAGE_STATE_KEY } from '@types';

export class ExcelPage extends Page {
  excel?: Excel;

  getRoot() {
    const wredux = new WRedux(rootReducer, initialState);

    const stateSubscribe = wutils.debounse((state: IState) => {
      wutils.storage(STORAGE_STATE_KEY, state);
    }, 400);

    wredux.subscribe(stateSubscribe);

    this.excel = new Excel({
      components: [Header, Toolbar, Formula, Table],
      wredux
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
