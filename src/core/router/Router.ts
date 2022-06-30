import { $, WQuery } from '@wquery';
import { DashboardPage } from 'pages/DashboardPage';
import { ExcelPage } from 'pages/ExcelPage';
import { ActiveRoute } from './ActiveRoute';

type TPage = DashboardPage | ExcelPage;

export interface IRoutes {
  [key: string]: typeof DashboardPage | typeof ExcelPage;
}

export class Router {
  $root: WQuery;
  page: TPage | null = null;

  constructor(selector: string, private routes: IRoutes) {
    this.$root = $(selector);

    this.changePage = this.changePage.bind(this);
    this.init();
  }

  changePage(): void {
    if (this.page) this.page.destroyPage();
    this.$root.clear();

    const pathName = ActiveRoute.pathName;
    const param = ActiveRoute.firstParam;

    if (!this.routes[pathName]) {
      this.createPage('home', param);
      return;
    }

    this.createPage(pathName, param);
  }

  createPage(pathName: string, param: string) {
    const Page = this.routes[pathName];
    this.page = new Page(param);
    this.$root.append(this.page.getRoot());
    this.page.initPage();
  }

  init() {
    window.addEventListener('hashchange', this.changePage);
    this.changePage();
  }

  destroy() {
    window.removeEventListener('hashchange', this.changePage);
  }
}
