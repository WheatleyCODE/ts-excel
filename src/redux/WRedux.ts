import { Actions, IState, IStore, IUnsubscribe, Reducer } from '@types';
import { initAC } from './actionCreators';

export class WRedux implements IStore {
  private state: IState;
  private subscribers: Array<(state: IState) => void> = [];

  constructor(private rootReducer: Reducer, initialState: IState) {
    this.state = rootReducer(initialState, initAC());
  }

  subscribe(callback: (state: IState) => void): IUnsubscribe {
    this.subscribers.push(callback);

    return {
      unsubscribe: () => {
        this.subscribers = this.subscribers.filter((fn) => fn !== callback);
      }
    };
  }

  dispatch(action: Actions): void {
    this.state = this.rootReducer(this.state, action);
    this.subscribers.forEach((sub) => sub(this.state));
  }

  getState(): IState {
    return this.state;
  }
}
