import { initialToolbarState, IState } from '@types';
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

export function getInitialState(key: string): IState {
  const initialState: IState = wutils.storage(key) ? wutils.storage(key) : defaultState;
  return initialState;
}
