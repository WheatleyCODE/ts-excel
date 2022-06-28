import { initialState, WRedux } from '@redux';
import { IComponent, IState, IUnsubscribe, StateKeys } from '@types';
import { wutils } from '@utils';

export class WReduxSubscriber {
  private unsabs: IUnsubscribe[] = [];
  private prevState: IState = initialState;

  constructor(private wredux: WRedux) {}

  subscribeComponents(components: IComponent[]) {
    this.prevState = this.wredux.getState();

    const unsub = this.wredux.subscribe((state) => {
      Object.keys(state).forEach((key) => {
        const stateKey = key as StateKeys;
        if (!wutils.isEqual(this.prevState[stateKey], state[stateKey])) {
          components.forEach((comp) => {
            if (comp.stringSubs && comp.stringSubs.includes(stateKey)) {
              const changes = { [stateKey]: state[stateKey] };
              comp.wreduxChanged(changes);
            }
          });
        }
      });

      this.prevState = this.wredux.getState();
    });

    this.unsabs.push(unsub);
  }

  unsubscribeComponents() {
    this.unsabs.forEach((unsab) => unsab.unsubscribe());
  }
}