export interface IButton {
  icon: string;
  isWall: boolean;
  active: boolean;
  modal?: boolean;
  value: IStyle | false;
}

export interface IToolbarStyles {
  justifyContent: string;
  alignItems: string;
  fontWeight: string;
  textDecoration: string;
  fontStyle: string;
  borderColor: string;
  color: string;
  backgroundColor: string;
}

export interface IToolbarState extends IToolbarStyles {
  openColorModal: boolean;
  openBackgroundColorModal: boolean;
  dataType: 'ruble' | 'percent' | 'default';
  countZeros: number;
}

export type ToolbarStyles = keyof IToolbarStyles;

export const toolbartStylesArr: ToolbarStyles[] = [
  'justifyContent',
  'alignItems',
  'fontWeight',
  'textDecoration',
  'fontStyle',
  'borderColor',
  'color',
  'backgroundColor'
];

export interface IStyle {
  [propName: string]: string | boolean;
}

export const initialToolbarState: IToolbarState = {
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
  fontWeight: 'normal',
  textDecoration: 'none',
  fontStyle: 'none',
  borderColor: 'string',
  color: 'string',
  backgroundColor: 'none',
  openColorModal: false,
  openBackgroundColorModal: false,
  dataType: 'default',
  countZeros: 2
};

export const defaultToolbarStyles: IToolbarStyles = {
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
  fontWeight: 'normal',
  textDecoration: 'none',
  fontStyle: 'normal',
  borderColor: 'rgb(222, 222, 222)',
  color: 'rgb(50, 50, 50)',
  backgroundColor: 'none'
};
