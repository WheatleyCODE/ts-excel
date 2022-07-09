import { ICombinedState, initialToolbarState, IExcelState, IDashboardState } from '@types';
import { storage } from '@utils';

export const defaultExcelState: IExcelState = {
  id: 0,
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

export const defaultDashboardState: IDashboardState = {
  current: 0,
  excels: []
};

export const defaultCombinedState: ICombinedState = {
  excelState: defaultExcelState,
  dashboardState: defaultDashboardState
};

export function getInitialState(key: string): ICombinedState {
  const initialState: ICombinedState = storage.get(key) ? storage.get(key) : defaultCombinedState;
  return initialState;
}
