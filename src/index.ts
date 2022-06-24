import { Excel, Header, Table, Toolbar, Formula } from '@components';
import { rootReducer, WRedux } from '@redux';
import '@styles/index.scss';

const wredux = new WRedux(rootReducer, { colState: {} });

const excel = new Excel('#root', {
  components: [Header, Toolbar, Formula, Table],
  wredux
});

excel.render();
