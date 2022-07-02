import { Actions, ActionsType, IState } from '@types';

export function excelReducer(state: IState, action: Actions): IState {
  const prevState: IState = JSON.parse(JSON.stringify(state));

  switch (action.type) {
    case ActionsType.INIT: {
      return { ...prevState };
    }

    case ActionsType.TABLE_RESIZE: {
      const { type, id, value } = action.payload;

      return {
        ...prevState,
        resizeState: {
          col: { ...prevState.resizeState.col },
          row: { ...prevState.resizeState.row },

          [type]: {
            ...prevState.resizeState[type],
            [id]: value
          }
        }
      };
    }

    case ActionsType.CHANGE_TEXT: {
      const { string, id } = action.payload;

      return {
        ...prevState,
        currentText: string,
        cellsDataState: {
          ...prevState.cellsDataState,
          [id]: string
        }
      };
    }

    case ActionsType.CHANGE_TITLE: {
      return {
        ...prevState,
        title: action.payload
      };
    }

    case ActionsType.CHANGE_OPEN_DATE: {
      return {
        ...prevState,
        openDate: new Date().toJSON()
      };
    }

    case ActionsType.CHANGE_PARSER_DATA: {
      const { id, result, formula } = action.payload;

      return {
        ...prevState,
        parserData: { ...prevState.parserData, [id]: { result, formula } }
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
      return { ...prevState };
    }
  }
}
