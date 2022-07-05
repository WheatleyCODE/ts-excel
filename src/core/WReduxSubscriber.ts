import { defaultCombinedState, WRedux } from '@redux';
import { IExcelComponent, IDashComponent, IUnsubscribe, ICombinedState } from '@types';
import { wutils } from '@utils';

export class WReduxSubscriber {
  private unsabs: IUnsubscribe[] = [];
  private prevState: ICombinedState = {
    ...defaultCombinedState
  };

  constructor(private wredux: WRedux) {}

  subscribeComponents(components: IExcelComponent[] | IDashComponent[]) {
    this.prevState = this.wredux.getState();

    const unsub = this.wredux.subscribe((state) => {
      Object.keys(state).forEach((key) => {
        if (!wutils.isEqual(this.prevState[key], state[key])) {
          components.forEach((comp) => {
            if (comp.strSubs && comp.strSubs.state === key) {
              const index = comp.strSubs.value.findIndex(
                (str) => !wutils.isEqual(this.prevState[key][str], state[key][str])
              );

              if (index === -1) return;

              const changes = { [key]: state[key] } as any;
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
