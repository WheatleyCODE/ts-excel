import { Router } from '@routing';
import { DashboardPage, ExcelPage } from '@pages';
import '@styles/index.scss';

new Router('#root', {
  home: DashboardPage,
  dashboard: DashboardPage,
  excel: ExcelPage
});
