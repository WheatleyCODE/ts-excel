import { TableCreator } from '@components/Dashboard/TableCreator/TableCreator';
import { Dashboard } from '@components/Dashboard/Dashboard';
import { DHeader } from '@components/Dashboard/DHeader/DHeader';
import { TableList } from '@components/Dashboard/TableList/TableList';
import { Page } from '@core';

export class DashboardPage extends Page {
  dashbpard?: Dashboard;

  getRoot() {
    console.log(this.options, 'this.options');

    this.dashbpard = new Dashboard({
      components: [DHeader, TableCreator, TableList],
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
