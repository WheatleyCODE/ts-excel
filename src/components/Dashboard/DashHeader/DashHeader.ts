import { $, WQuery } from '@wquery';
import { IDashboardComOptions } from '@types';
import { createDashHeader } from './dashHeader.template';
import { Component, StateComponent } from '@core';

export interface IDashHeaderState {
  openMenu: boolean;
  openServices: boolean;
}
@StateComponent<IDashHeaderState>({ openMenu: false, openServices: false })
export class DashHeader extends Component {
  static classNames = ['db__header', 'db-header'];

  constructor($el: WQuery, options: IDashboardComOptions) {
    super($el, {
      name: 'DashHeader',
      listeners: ['click'],
      ...options
    });
  }

  componentDidMount() {
    document.onclick = (e) => this.onClickOutside(e);
  }

  componentWilUnmount() {
    document.onclick = null;
  }

  onClick(e: MouseEvent) {
    if (!(e.target instanceof HTMLElement)) return;
    const $target = $(e.target);
    const state = { ...this.getComponentState<IDashHeaderState>() };

    if ($target.data.menu) {
      state.openMenu = !state.openMenu;
      this.setComponentState<IDashHeaderState>(state);
    }

    if ($target.data.services) {
      state.openServices = !state.openServices;
      this.setComponentState<IDashHeaderState>(state);
    }
  }

  onClickOutside(e: MouseEvent) {
    if (!(e.target instanceof HTMLElement)) return;
    const $target = $(e.target);

    if ($target.data.modal || $target.data.menu || $target.data.services) return;

    this.setComponentState<IDashHeaderState>({
      ...this.getComponentState(),
      openMenu: false,
      openServices: false
    });
  }

  toHTML(): string {
    return createDashHeader(this.getComponentState<IDashHeaderState>());
  }
}
