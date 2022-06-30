import { Page } from '@routing';
import { $ } from '@wquery';
import { createDashboard } from './dashboard.template';

export class DashboardPage extends Page {
  initPage() {}
  destroyPage() {}

  getRoot() {
    return $.create('div', 'db').setHtml(createDashboard());
  }
}
