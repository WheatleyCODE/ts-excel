import { Actions, ActionsType, IResizeTableACOptions } from '@types';

export const initAC = (): Actions => ({ type: ActionsType.INIT, payload: null });

export const resizeTableAC = (options: IResizeTableACOptions): Actions => ({
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
