import { WReduxSubscriber, Emitter } from '@core';
import { WRedux } from '@redux';

export interface IAppOtions {
  wredux: WRedux;
  wreduxSubscriber: WReduxSubscriber;
  emitter: Emitter;
}
