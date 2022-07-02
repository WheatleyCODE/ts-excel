import { Emitter } from './Emitter';
import { getInitialState, rootReducer, WRedux } from '@redux';
import { IAppOtions, IPage, IRoutes, IState, STORAGE_STATE_KEY } from '@types';
import { wutils } from '@utils';
import { Router } from './router';
import { WReduxSubscriber } from './WReduxSubscriber';

export interface IAppRouterOprions {
  Page: typeof IPage;
  options: IAppOtions;
}

export class App {
  private routes: { [key: string]: IAppRouterOprions } = {};
  private wredux: WRedux;
  private wreduxSubscriber: WReduxSubscriber;
  private emitter: Emitter;

  constructor(public selector: string, routes: IRoutes[]) {
    this.wredux = new WRedux(rootReducer, getInitialState(STORAGE_STATE_KEY));

    const stateSubscribe = wutils.debounse((state: IState) => {
      wutils.storage(STORAGE_STATE_KEY, state);
    }, 400);

    this.wredux.subscribe(stateSubscribe);

    this.wreduxSubscriber = new WReduxSubscriber(this.wredux);
    this.emitter = new Emitter();

    routes.forEach(({ path, Page }) => {
      this.routes[path] = {
        Page: Page,
        options: {
          wredux: this.wredux,
          wreduxSubscriber: this.wreduxSubscriber,
          emitter: this.emitter
        }
      };
    });
  }

  render(): void {
    new Router('#root', this.routes);
  }
}
