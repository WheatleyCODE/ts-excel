import { Actions, ActionsType, IResizeTableACOptions } from '@types';

export const initAC = (): Actions => ({ type: ActionsType.INIT, payload: null });
export const resizeTableAC = (options: IResizeTableACOptions): Actions => ({
  type: ActionsType.TABLE_RESIZE,
  payload: options
});
