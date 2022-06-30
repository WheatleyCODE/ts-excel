import { $, WQuery } from '@wquery';
import { DashboardPage } from 'pages/DashboardPage';
import { ExcelPage } from 'pages/ExcelPage';
import { ActiveRoute } from './ActiveRoute';

export interface IRoutes {
  [key: string]: typeof DashboardPage | typeof ExcelPage;
}

export class Router {
  $root: WQuery;

  constructor(selector: string, private routes: IRoutes) {
    this.$root = $(selector);

    this.changePage = this.changePage.bind(this);
    this.init();
  }

  changePage(): void {
    this.$root.setHtml('');
    const pathName = ActiveRoute.pathName;
    const params = ActiveRoute.params;

    console.log(pathName);
    console.log(this.routes[pathName]);
    console.log(this.routes);

    if (!this.routes[pathName]) {
      this.$root.append($.create('h1', 'error404').setTextContent('Error 404'));
      return;
    }

    const Page = this.routes[pathName];
    const page = new Page(params);
    this.$root.append(page.getRoot());
    page.initPage();
  }

  init() {
    window.addEventListener('hashchange', this.changePage);
    this.changePage();
  }

  destroy() {
    window.removeEventListener('hashchange', this.changePage);
  }
}
