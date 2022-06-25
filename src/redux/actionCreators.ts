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
