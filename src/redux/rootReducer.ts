import { Actions, ICombinedState } from '@types';
import { dashboardReducer } from './reducers/dashboardReducer';
import { excelReducer } from './reducers/excelReducer';

export function rootReducer(state: ICombinedState, action: Actions): ICombinedState {
  return {
    excelState: excelReducer(state.excelState, action),
    dashboardState: dashboardReducer(state.dashboardState, action)
  };
}
