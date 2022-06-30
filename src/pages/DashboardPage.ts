import { Page } from '@core';
import { $ } from '@wquery';
import { createDashboard } from './dashboard.template';

export class DashboardPage extends Page {
  initPage() {}
  destroyPage() {}

  getRoot() {
    return $.create('div', 'db').setHtml(createDashboard());
  }
}
