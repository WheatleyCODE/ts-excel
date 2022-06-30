import { Router } from '@core';
import { DashboardPage, ExcelPage } from '@pages';
import '@styles/index.scss';

new Router('#root', {
  dashboard: DashboardPage,
  excel: ExcelPage
});
