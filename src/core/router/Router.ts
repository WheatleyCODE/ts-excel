import { IAppRouterOprions } from '@core/App';
import { IPage } from '@types';
import { $, WQuery } from '@wquery';
import { ActiveRoute } from './ActiveRoute';

export class Router {
  $root: WQuery;
  page: IPage | null = null;

  constructor(selector: string, private routes: { [key: string]: IAppRouterOprions }) {
    this.$root = $(selector);

    this.changePage = this.changePage.bind(this);
    this.init();
  }

  changePage(): void {
    if (this.page) this.page.destroyPage();
    this.$root.clear();

    const pathName = ActiveRoute.pathName;

    if (!this.routes[pathName]) {
      this.createPage('/');
      return;
    }

    this.createPage(pathName);
  }

  createPage(pathName: string) {
    const { Page, options } = this.routes[pathName];
    this.page = new Page(options);
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
