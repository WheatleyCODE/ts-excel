import { IButton, IToolbarState } from '@types';

export function createButtonsData(state: IToolbarState): IButton[] {
  return [
    {
      icon: 'undo',
      isWall: false,
      active: false,
      value: false
    },
    {
      icon: 'redo',
      isWall: false,
      active: false,
      value: false
    },
    {
      icon: 'print',
      isWall: false,
      active: false,
      value: false
    },
    {
      icon: 'format_paint',
      isWall: true,
      active: false,
      value: false
    },
    {
      icon: 'currency_ruble',
      isWall: false,
      active: state.dataType === 'ruble',
      value: state.dataType === 'ruble' ? { dataType: 'default' } : { dataType: 'ruble' }
    },
    {
      icon: 'percent',
      isWall: false,
      active: state.dataType === 'percent',
      value: state.dataType === 'percent' ? { dataType: 'default' } : { dataType: 'percent' }
    },
    {
      icon: 'chevron_left',
      isWall: false,
      active: false,
      value: false
    },
    {
      icon: 'chevron_right',
      isWall: true,
      active: false,
      value: false
    },
    {
      icon: 'format_bold',
      isWall: false,
      active: state.fontWeight === 'bold',
      value: state.fontWeight === 'bold' ? { fontWeight: 'normal' } : { fontWeight: 'bold' }
    },
    {
      icon: 'format_italic',
      isWall: false,
      active: state.fontStyle === 'italic',
      value: state.fontStyle === 'italic' ? { fontStyle: 'normal' } : { fontStyle: 'italic' }
    },
    {
      icon: 'strikethrough_s',
      isWall: false,
      active: state.textDecoration === 'line-through',
      value:
        state.textDecoration === 'line-through'
          ? { textDecoration: 'none' }
          : { textDecoration: 'line-through' }
    },
    {
      icon: 'format_underlined',
      isWall: true,
      active: state.textDecoration === 'underline',
      value:
        state.textDecoration === 'underline'
          ? { textDecoration: 'none' }
          : { textDecoration: 'underline' }
    },
    {
      icon: 'format_color_text',
      isWall: false,
      modal: state.openColorModal,
      active: state.openColorModal === true,
      value: state.openColorModal === true ? { openColorModal: false } : { openColorModal: true }
    },
    {
      icon: 'format_color_fill',
      isWall: true,
      active: state.openBackgroundColorModal === true,
      modal: state.openBackgroundColorModal,
      value:
        state.openBackgroundColorModal === true
          ? { openBackgroundColorModal: false }
          : { openBackgroundColorModal: true }
    },
    {
      icon: 'border_all',
      isWall: false,
      active: state.border === '1px solid black',
      value:
        state.border === '1px solid black'
          ? { border: '1px solid rgb(222, 222, 222)' }
          : { border: '1px solid black' }
    },
    {
      icon: 'format_align_left',
      isWall: false,
      active: state.justifyContent === 'flex-start',
      value: { justifyContent: 'flex-start' }
    },
    {
      icon: 'format_align_center',
      isWall: false,
      active: state.justifyContent === 'center',
      value: { justifyContent: 'center' }
    },
    {
      icon: 'format_align_right',
      isWall: true,
      active: state.justifyContent === 'flex-end',
      value: { justifyContent: 'flex-end' }
    },
    {
      icon: 'align_vertical_top',
      isWall: false,
      active: state.alignItems === 'flex-start',
      value: { alignItems: 'flex-start' }
    },
    {
      icon: 'align_vertical_center',
      isWall: false,
      active: state.alignItems === 'center',
      value: { alignItems: 'center' }
    },
    {
      icon: 'align_vertical_bottom',
      isWall: false,
      active: state.alignItems === 'flex-end',
      value: { alignItems: 'flex-end' }
    }
  ];
}
