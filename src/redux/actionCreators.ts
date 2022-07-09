import { Actions, ActionsType, IResizeTableOptions, IExcelState } from '@types';

export const initAC = (): Actions => ({ type: ActionsType.INIT, payload: null });

export const resizeTableAC = (options: IResizeTableOptions): Actions => ({
  type: ActionsType.TABLE_RESIZE,
  payload: options
});

export const changeTextAC = (id: string, string: string): Actions => ({
  type: ActionsType.CHANGE_TEXT,
  payload: {
    id,
    string
  }
});

export const changeStyleAC = (id: string, style: { [key: string]: string }): Actions => ({
  type: ActionsType.CHANGE_STYLE,
  payload: {
    id,
    style
  }
});

export const stylesCurrentCellAC = (styles: { [key: string]: string }): Actions => ({
  type: ActionsType.STYLES_CURRENT_CELL,
  payload: {
    styles
  }
});

export const changeTitleAC = (payload: string): Actions => ({
  type: ActionsType.CHANGE_TITLE,
  payload
});

export const changeParserData = (id: string, formula: string, result: string): Actions => ({
  type: ActionsType.CHANGE_PARSER_DATA,
  payload: {
    id,
    formula,
    result
  }
});

export const changeOpenDate = (): Actions => ({
  type: ActionsType.CHANGE_OPEN_DATE
});

export const createTableAC = (id: number): Actions => ({
  type: ActionsType.CREATE_TABLE,
  payload: id
});

export const createTablePreserAC = (id: number, excel: IExcelState): Actions => ({
  type: ActionsType.CREATE_TABLE_PRESET,
  payload: {
    id,
    excel
  }
});

export const setCurrentExcelStateAC = (excel: IExcelState): Actions => ({
  type: ActionsType.SET_CURRENT_EXCEL_STATE,
  payload: excel
});

export const saveCurrentExcelStateAC = (excel: IExcelState): Actions => ({
  type: ActionsType.SAVE_CURRENT_EXCEL_STATE,
  payload: excel
});

export const removeCurrentExcelStateAC = (id: number): Actions => ({
  type: ActionsType.REMOVE_CURRENT_EXCEL_STATE,
  payload: id
});
