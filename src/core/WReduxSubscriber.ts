import { initialState, WRedux } from '@redux';
import { IComponent, IState, IUnsubscribe, StateKeys } from '@types';
import { wutils } from '@utils';

export class WReduxSubscriber {
  private unsab!: IUnsubscribe;
  private prevState: IState = initialState;

  constructor(private wredux: WRedux) {}

  subscribeComponents(components: IComponent[]) {
    this.prevState = this.wredux.getState();

    this.unsab = this.wredux.subscribe((state) => {
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

    console.log(this.unsab, 'fdfd');
  }

  unsubscribeComponents() {
    this.unsab.unsubscribeAll();
  }
}
