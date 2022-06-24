import { rootReducer, WRedux } from '@redux';
import { Excel, Header, Table, Toolbar, Formula } from '@components';
import { IState } from '@types';
import '@styles/index.scss';

const initialState: IState = {
  resizeState: {
    col: {},
    row: {}
  }
};

const wredux = new WRedux(rootReducer, initialState);

const excel = new Excel('#root', {
  components: [Header, Toolbar, Formula, Table],
  wredux
});

excel.render();
