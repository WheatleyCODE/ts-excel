import { TableList, TableCreator, DashHeader, Dashboard } from '@components';
import { Page } from '@core';

export class DashboardPage extends Page {
  dashbpard?: Dashboard;

  getRoot() {
    this.dashbpard = new Dashboard({
      components: [DashHeader, TableCreator, TableList],
      ...this.options
    });

    return this.dashbpard?.getRootDashboard();
  }

  initPage() {
    this.dashbpard?.init();
  }

  destroyPage() {
    this.dashbpard?.destroy();
  }
}
