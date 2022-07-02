import { ICombinedState, initialToolbarState, IState } from '@types';
import { wutils } from '@utils';

export const defaultState: IState = {
  resizeState: {
    col: {},
    row: {}
  },
  cellsDataState: {},
  cellsStylesState: {},
  currentText: '',
  currentCellStyles: {
    ...initialToolbarState
  },
  title: 'Новая таблица',
  parserData: {},
  openDate: new Date().toJSON()
};

export function getInitialState(key: string): ICombinedState {
  const initialState: ICombinedState = wutils.storage(key)
    ? wutils.storage(key)
    : { excelState: defaultState, dashboardState: defaultState };
  return initialState;
}
