import { Actions, IStore, IUnsubscribe, combinedReducer, ICombinedState } from '@types';
import { initAC } from './actionCreators';

export class WRedux implements IStore {
  private state: ICombinedState;
  private subscribers: Array<(state: ICombinedState) => void> = [];

  constructor(private rootReducer: combinedReducer, initialState: ICombinedState) {
    this.state = rootReducer(initialState, initAC());
  }

  subscribe(callback: (state: ICombinedState) => void): IUnsubscribe {
    this.subscribers.push(callback);

    return {
      unsubscribe: () => {
        this.subscribers = this.subscribers.filter((fn) => fn !== callback);
      },

      unsubscribeAll: () => {
        this.subscribers = [];
      }
    };
  }

  dispatch(action: Actions): void {
    this.state = this.rootReducer(this.state, action);
    this.subscribers.forEach((sub) => sub(this.state));
  }

  getState(): ICombinedState {
    return JSON.parse(JSON.stringify(this.state));
  }
}
