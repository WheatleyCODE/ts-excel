import { Actions, ActionsType, IState } from '@types';

export function rootReducer(state: IState, action: Actions): IState {
  const prevState: IState = JSON.parse(JSON.stringify(state));

  switch (action.type) {
    case ActionsType.INIT: {
      return { ...state };
    }

    case ActionsType.TABLE_RESIZE: {
      const { type, id, value } = action.payload;

      return {
        ...state,
        resizeState: {
          col: { ...state.resizeState.col },
          row: { ...state.resizeState.row },

          [type]: {
            ...state.resizeState[type],
            [id]: value
          }
        }
      };
    }

    case ActionsType.CHANGE_TEXT: {
      const { string, id } = action.payload;

      return {
        ...state,
        currentText: string,
        cellsDataState: {
          ...state.cellsDataState,
          [id]: string
        }
      };
    }

    case ActionsType.CHANGE_STYLE: {
      const { id, style } = action.payload;

      Object.keys(style).forEach((key) => {
        prevState.currentCellStyles[key] = style[key];
      });

      return {
        ...prevState,
        cellsStylesState: {
          ...prevState.cellsStylesState,
          [id]: { ...prevState.cellsStylesState[id], ...style }
        }
      };
    }

    case ActionsType.STYLES_CURRENT_CELL: {
      const { styles } = action.payload;

      Object.keys(styles).forEach((key) => {
        prevState.currentCellStyles[key] = styles[key];
      });

      return {
        ...prevState
      };
    }

    default: {
      return { ...state };
    }
  }
}
