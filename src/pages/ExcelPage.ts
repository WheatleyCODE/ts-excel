import { Page } from '@routing';
import { getInitialState, rootReducer, WRedux } from '@redux';
import { Excel, Header, Table, Toolbar, Formula } from '@components';
import { wutils } from '@utils';
import { IState, STORAGE_STATE_KEY } from '@types';

export class ExcelPage extends Page {
  excel?: Excel;

  getRoot() {
    const wredux = new WRedux(rootReducer, getInitialState(this.storageName));

    const stateSubscribe = wutils.debounse((state: IState) => {
      wutils.storage(this.storageName, state);
    }, 400);

    wredux.subscribe(stateSubscribe);

    this.excel = new Excel({
      components: [Header, Toolbar, Formula, Table],
      wredux
    });

    return this.excel.getRootExcel();
  }

  get storageName(): string {
    const id = this.param || Date.now().toString();
    return `${STORAGE_STATE_KEY}:${id}`;
  }

  initPage() {
    this.excel?.init();
  }

  destroyPage() {
    this.excel?.destroy();
  }
}
