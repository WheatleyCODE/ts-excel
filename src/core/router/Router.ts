import { IRoutes, IPage } from '@types';
import { $, WQuery } from '@wquery';
import { ActiveRoute } from './ActiveRoute';

export class Router {
  $root: WQuery;
  page: IPage | null = null;
  routes: { [key: string]: typeof IPage } = {};

  constructor(selector: string, routes: IRoutes[]) {
    this.$root = $(selector);

    routes.forEach(({ path, Page }) => {
      this.routes[path] = Page;
    });

    this.changePage = this.changePage.bind(this);
    this.init();
  }

  changePage(): void {
    if (this.page) this.page.destroyPage();
    this.$root.clear();

    const pathName = ActiveRoute.pathName;
    const param = ActiveRoute.firstParam;

    if (!this.routes[pathName]) {
      this.createPage('/', param);
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
