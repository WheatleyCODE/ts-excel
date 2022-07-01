import { DashboardPage, ExcelPage } from '@pages';
import { IRoutes } from '@types';

export const pathRoutes: IRoutes[] = [
  {
    path: '/',
    Page: DashboardPage
  },
  {
    path: 'dashboard',
    Page: DashboardPage
  },
  {
    path: 'excel',
    Page: ExcelPage
  }
];
