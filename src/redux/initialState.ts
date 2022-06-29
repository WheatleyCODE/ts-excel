import { initialToolbarState, IState, STORAGE_STATE_KEY } from '@types';
import { wutils } from '@utils';

const defaultState: IState = {
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
  parcerData: {}
};

export const initialState: IState = wutils.storage(STORAGE_STATE_KEY)
  ? wutils.storage(STORAGE_STATE_KEY)
  : defaultState;
