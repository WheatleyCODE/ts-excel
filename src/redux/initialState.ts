import { ICombinedState, initialToolbarState, IExcelState, IDashboardState } from '@types';
import { wutils } from '@utils';

export const defaultExcelState: IExcelState = {
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
  isDashboard: true
};

export const defaultCombinedState: ICombinedState = {
  excelState: defaultExcelState,
  dashboardState: defaultDashboardState
};

export function getInitialState(key: string): ICombinedState {
  const initialState: ICombinedState = wutils.storage(key)
    ? wutils.storage(key)
    : defaultCombinedState;
  return initialState;
}
