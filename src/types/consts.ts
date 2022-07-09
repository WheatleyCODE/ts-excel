import { IExcelState } from './redux';
export const MIN_ROW_HEIGHT = 20;
export const MIN_COL_WIDTH = 30;
export const RESIZER_MARGIN = 2;
export const DEFAULT_WIDTH = 110;
export const DEFAULT_HEGHT = 24;

export const ID_FIRST_CELL = '1:1';
export const SELECTED_CELL = 'selected';
export const SELECTED_HEADER = 'selected';
export const FORMULA_SELECT = 'formula-select';
export const ACTIVE_SEL_EL = 'active';

export const COLORS = [
  'rgb(50, 50, 50)',
  'white',
  'red',
  'yellow',
  'orange',
  'rgb(37, 95, 212)',
  'rgb(100, 50, 255, 0.1)'
];

export const STORAGE_STATE_KEY = 'excel';

export const CODES = {
  A: 65,
  Z: 90
};

export const MAX_LENGTH = 25;

export const presetInvest: IExcelState = {
  id: 0,
  resizeState: {
    col: {
      '10': 76
    },
    row: {
      '7': 24,
      '14': 22
    }
  },
  cellsDataState: {
    '1:1': '',
    '4:9': 'Tesla',
    '4:12': '',
    '4:5': 'Акция',
    '5:5': 'Цена_$',
    '6:5': 'Количество',
    '6:6': '',
    '7:5': 'Сумма_Р',
    '7:9': '=E9*F9*J3',
    '4:7': 'Apple',
    '4:8': 'Mircosoft',
    '5:7': '140',
    '8:5': '',
    '6:8': '10',
    '7:8': '=E8*F8*J3',
    '7:7': '=E7*F7*J3',
    '9:5': '',
    '9:3': 'Доллар:',
    '10:3': '57',
    '10:7': '',
    '9:8': '',
    '9:7': '',
    '9:9': '',
    '8:7': '',
    '6:7': '20',
    '8:11': '',
    '5:8': '265',
    '5:11': '',
    '5:14': '',
    '1:8': '',
    '4:11': '',
    '5:12': '',
    '7:11': '=G7+G8+G9',
    '6:13': '',
    '6:14': '',
    '6:1': '',
    '7:13': '',
    '6:11': 'Сумма',
    '5:1': '',
    '5:9': '760',
    '6:9': '3',
    '6:12': ''
  },
  cellsStylesState: {
    '4:5': {
      border: '1px solid black',
      justifyContent: 'center',
      fontWeight: 'bold'
    },
    '5:5': {
      border: '1px solid black',
      justifyContent: 'center',
      fontWeight: 'bold'
    },
    '6:5': {
      border: '1px solid black',
      justifyContent: 'center',
      fontWeight: 'bold'
    },
    '7:5': {
      border: '1px solid black',
      justifyContent: 'center',
      fontWeight: 'bold'
    },
    '9:3': {
      justifyContent: 'flex-end',
      fontWeight: 'bold'
    },
    '10:3': {
      justifyContent: 'center',
      fontStyle: 'italic',
      border: '1px solid black',
      'background-color': 'rgb(100, 50, 255, 0.1)'
    },
    '4:7': {
      justifyContent: 'center',
      'background-color': 'rgb(100, 50, 255, 0.1)',
      fontWeight: 'bold'
    },
    '5:7': {
      justifyContent: 'center',
      'background-color': 'rgb(100, 50, 255, 0.1)'
    },
    '6:7': {
      justifyContent: 'center',
      'background-color': 'rgb(100, 50, 255, 0.1)',
      color: 'rgb(50, 50, 50)',
      fontWeight: 'bold'
    },
    '7:7': {
      justifyContent: 'center',
      'background-color': 'rgb(100, 50, 255, 0.1)'
    },
    '4:8': {
      justifyContent: 'center',
      'background-color': 'rgb(100, 50, 255, 0.1)',
      fontWeight: 'bold'
    },
    '5:8': {
      justifyContent: 'center',
      'background-color': 'rgb(100, 50, 255, 0.1)'
    },
    '6:8': {
      justifyContent: 'center',
      'background-color': 'rgb(100, 50, 255, 0.1)',
      fontWeight: 'bold'
    },
    '7:8': {
      justifyContent: 'center',
      'background-color': 'rgb(100, 50, 255, 0.1)'
    },
    '4:9': {
      'background-color': 'rgb(100, 50, 255, 0.1)',
      justifyContent: 'center',
      fontWeight: 'bold'
    },
    '5:9': {
      'background-color': 'rgb(100, 50, 255, 0.1)',
      justifyContent: 'center'
    },
    '6:9': {
      'background-color': 'rgb(100, 50, 255, 0.1)',
      justifyContent: 'center',
      fontWeight: 'bold'
    },
    '7:9': {
      'background-color': 'rgb(100, 50, 255, 0.1)',
      justifyContent: 'center'
    },
    '3:9': {
      justifyContent: 'center'
    },
    '6:11': {
      justifyContent: 'flex-end',
      fontWeight: 'bold'
    },
    '7:11': {
      border: '1px solid black',
      justifyContent: 'center',
      fontWeight: 'normal'
    },
    '3:14': {
      justifyContent: 'center'
    }
  },
  currentText: '=E9*F9*J3',
  currentCellStyles: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    fontWeight: 'normal',
    textDecoration: 'none',
    fontStyle: 'normal',
    borderColor: 'rgb(222, 222, 222)',
    color: 'rgb(50, 50, 50)',
    backgroundColor: 'rgba(100, 50, 255, 0.1)',
    openColorModal: false,
    openBackgroundColorModal: false,
    dataType: 'default',
    countZeros: 2,
    border: '1px solid black',
    'background-color': 'rgb(100, 50, 255, 0.1)'
  },
  title: 'Инвестиции',
  parserData: {
    '4:5': {
      result: 'Акция',
      formula: 'Акция'
    },
    '5:5': {
      result: 'Цена_$',
      formula: 'Цена_$'
    },
    '6:5': {
      result: 'Количество',
      formula: 'Количество'
    },
    '7:5': {
      result: 'Сумма_Р',
      formula: 'Сумма_Р'
    },
    '4:7': {
      result: 'Apple',
      formula: 'Apple'
    },
    '8:5': {
      result: '',
      formula: ''
    },
    '9:3': {
      result: 'Доллар:',
      formula: 'Доллар:'
    },
    '10:3': {
      result: '57',
      formula: '57'
    },
    '5:7': {
      result: '140',
      formula: '140'
    },
    '6:7': {
      result: '20',
      formula: '20'
    },
    '7:7': {
      result: '159600',
      formula: '=E7*F7*J3'
    },
    '4:8': {
      result: 'Mircosoft',
      formula: 'Mircosoft'
    },
    '5:8': {
      result: '265',
      formula: '265'
    },
    '6:8': {
      result: '10',
      formula: '10'
    },
    '7:8': {
      result: '151050',
      formula: '=E8*F8*J3'
    },
    '7:9': {
      result: '129960',
      formula: '=E9*F9*J3'
    },
    '4:9': {
      result: 'Tesla',
      formula: 'Tesla'
    },
    '5:9': {
      result: '760',
      formula: '760'
    },
    '6:9': {
      result: '3',
      formula: '3'
    },
    '6:11': {
      result: 'Сумма',
      formula: 'Сумма'
    },
    '7:11': {
      result: '440610',
      formula: '=G7+G8+G9'
    },
    '3:14': {
      result: '',
      formula: ''
    }
  },
  openDate: '2022-07-08T14:37:03.510Z'
};
