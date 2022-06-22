import { Excel, Header, Table, Toolbar, Formula } from '@components';
import '@styles/index.scss';

const excel = new Excel('#root', {
  components: [Header, Toolbar, Formula, Table]
});

excel.render();
