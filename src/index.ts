import { rootReducer, WRedux } from '@redux';
import { Excel, Header, Table, Toolbar, Formula } from '@components';
import { wutils } from '@utils';
import { IState, STORAGE_STATE_KEY } from '@types';
import '@styles/index.scss';

const initialState: IState = wutils.storage(STORAGE_STATE_KEY);

const wredux = new WRedux(rootReducer, initialState);

wredux.subscribe((state) => {
  wutils.storage(STORAGE_STATE_KEY, state);
});

const excel = new Excel('#root', {
  components: [Header, Toolbar, Formula, Table],
  wredux
});

excel.render();
