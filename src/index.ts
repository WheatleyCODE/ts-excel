import { Excel, Header, Table, Toolbar, Formula } from '@components';
import '@styles/index.scss';

const excel = new Excel('#root', {
  components: [new Header(), new Table(), new Toolbar(), new Formula()]
});

excel.log();
