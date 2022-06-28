import { initialState, rootReducer, WRedux } from '@redux';
import { Excel, Header, Table, Toolbar, Formula } from '@components';
import { wutils } from '@utils';
import { IState, STORAGE_STATE_KEY } from '@types';
import '@styles/index.scss';

const wredux = new WRedux(rootReducer, initialState);

const stateSubscribe = wutils.debounse((state: IState) => {
  wutils.storage(STORAGE_STATE_KEY, state);
}, 400);

wredux.subscribe(stateSubscribe);

const excel = new Excel('#root', {
  components: [Header, Toolbar, Formula, Table],
  wredux
});

excel.render();
