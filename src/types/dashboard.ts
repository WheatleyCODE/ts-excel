import { Emitter, WReduxSubscriber } from '@core';
import { Component } from '@core/Component';
import { WRedux } from '@redux';
import { WQuery } from '@wquery';
import { StateKeys } from './redux';

export class IDashComponent extends Component {
  static classNames = ['', ''];

  constructor($el: WQuery, options: IDashboardComOptions) {
    super($el, {
      name: 'IComponent',
      listeners: [],
      subscribe: [],
      ...options
    });
  }

  toHTML() {
    return '';
  }
}

export interface IDasOptions {
  components: typeof IDashComponent[];
  wredux: WRedux;
  emitter: Emitter;
  wreduxSubscriber: WReduxSubscriber;
}

export interface IDashboardComOptions {
  emitter: Emitter;
  wredux: WRedux;
}

export interface IDashOptions extends IDashboardComOptions {
  name: string;
  listeners: string[];
  subscribe?: StateKeys[];
}
