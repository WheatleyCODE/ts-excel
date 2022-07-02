import { $, WQuery } from '@wquery';
import {
  IExcelComOptions,
  IToolbarState,
  IStyle,
  initialToolbarState,
  ICombinedState
} from '@types';
import { createToolbar } from './toolbar.template';
import { EventNames, stateComponent } from '@core';
import { ExcelComponent } from '@components/Excel/ExcelComponent';

@stateComponent<IToolbarState>(initialToolbarState)
export class Toolbar extends ExcelComponent {
  static classNames = ['excel__toolbar', 'excel-toolbar'];

  constructor($el: WQuery, options: IExcelComOptions) {
    super($el, {
      name: 'Toolbar',
      listeners: ['click'],
      subscribe: { state: 'excelState', value: ['currentCellStyles'] },
      ...options
    });
  }

  componentDidMount() {
    document.onclick = (e) => this.onClickOutside(e);

    this.setComponentState<IToolbarState>({
      ...initialToolbarState,
      ...this.getState().excelState.currentCellStyles
    });
  }

  componentWilUnmount() {
    document.onclick = null;
  }

  wreduxChanged(changes: ICombinedState): void {
    const currentCellStyles = changes.excelState.currentCellStyles;

    this.setComponentState<IToolbarState>({
      ...this.getComponentState(),
      ...currentCellStyles
    });
  }

  onClickOutside(e: MouseEvent) {
    if (!(e.target instanceof HTMLElement)) return;
    const $target = $(e.target);
    const state = this.getComponentState<IToolbarState>();

    if (state.openBackgroundColorModal || state.openColorModal) {
      if (!$target.data.dropdown) {
        this.setComponentState({
          ...state,
          openBackgroundColorModal: false,
          openColorModal: false
        });
      }
    }
  }

  onClick(e: MouseEvent) {
    if (!(e.target instanceof HTMLDivElement)) return;
    e.stopPropagation();
    const $target = $(e.target);

    this.onClickOutside(e);

    if ($target.data.type) {
      if ($target.data.value) {
        const style: IStyle = JSON.parse($target.data.value);

        this.setComponentState<IToolbarState>({
          ...this.getComponentState(),
          ...style
        });

        this.emit(EventNames.TOOLBAR_BUTTON_CLICK, style);
      }
    }
  }

  get template() {
    return createToolbar(this.getComponentState());
  }

  toHTML(): string {
    return this.template;
  }
}
