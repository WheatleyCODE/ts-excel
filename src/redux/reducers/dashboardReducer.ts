import { defaultExcelState } from '@redux/initialState';
import { Actions, ActionsType, IDashboardState, IExcelState } from '@types';

export function dashboardReducer(state: IDashboardState, action: Actions): IDashboardState {
  const prevState: IDashboardState = JSON.parse(JSON.stringify(state));
  const copyDefaultExcelState: IExcelState = JSON.parse(JSON.stringify(defaultExcelState));

  switch (action.type) {
    case ActionsType.INIT: {
      return { ...state };
    }

    case ActionsType.CREATE_TABLE: {
      copyDefaultExcelState.id = action.payload;
      return {
        ...prevState,
        current: action.payload,
        excels: [...prevState.excels, copyDefaultExcelState]
      };
    }

    case ActionsType.CREATE_TABLE_PRESET: {
      const { id, excel } = action.payload;
      const newExcState: IExcelState = JSON.parse(JSON.stringify(excel));
      newExcState.id = id;

      return {
        ...prevState,
        current: id,
        excels: [...prevState.excels, newExcState]
      };
    }

    case ActionsType.SAVE_CURRENT_EXCEL_STATE: {
      const id = action.payload.id;
      const dsds = prevState.excels.filter((excel) => excel.id !== id);

      return {
        ...prevState,
        excels: [action.payload, ...dsds]
      };
    }

    case ActionsType.REMOVE_CURRENT_EXCEL_STATE: {
      const newExcels = prevState.excels.filter((excel) => excel.id !== action.payload);

      return {
        ...prevState,
        excels: [...newExcels]
      };
    }

    default: {
      return { ...state };
    }
  }
}
