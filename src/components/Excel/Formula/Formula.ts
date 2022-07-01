import { EventNames } from '@core';
import { ExcelComponent } from '@components';
import { WQuery } from '@wquery';
import { EventKeys, IExcelComOptions, StateValues } from '@types';

export class Formula extends ExcelComponent {
  static classNames = ['excel__formula', 'excel-formula'];
  private $input!: WQuery;
  private $currentCell!: WQuery;

  constructor($el: WQuery, options: IExcelComOptions) {
    super($el, {
      name: 'Formula',
      listeners: ['input', 'keydown', 'mousedown'],
      subscribe: ['currentText'],
      ...options
    });
  }

  onInput(): void {
    this.emit(EventNames.FORMULA_INPUT, this.parser.parse(this.$input.getTextContent(), 'input'));
  }

  onMousedown(e: MouseEvent): void {
    if (!(e.target instanceof HTMLDivElement)) return;

    this.emit(EventNames.FORMULA_PRINT_FORMULA_SELECT);

    if (e.target.dataset.current === this.$currentCell.data.current) {
      e.preventDefault();
      this.emit(EventNames.FORMULA_SELECT_ALL);
    }
  }

  wreduxChanged(changes: { [key: string]: StateValues }): void {
    const { currentText } = changes;
    if (typeof currentText === 'string') {
      this.$input.setTextContent(currentText);
    }
  }

  onKeydown(e: KeyboardEvent): void {
    if (e.key === EventKeys.ENTER || e.key === EventKeys.TAB) {
      e.preventDefault();

      this.emit(EventNames.FORMULA_TAB_OR_ENTER_PRESS);
    }
  }

  componentDidMount(): void {
    super.componentDidMount();

    const $input = this.$root.find('[data-input]');
    const $currentCell = this.$root.find('[data-current]');

    if (!$input || !$currentCell) return;
    this.$input = $input;
    this.$currentCell = $currentCell;

    this.on(EventNames.TABLE_CELECT_CELL, (string) => {
      if (typeof string === 'string') {
        this.$input.setTextContent(string);
      }
    });

    this.on(EventNames.TABLE_EMIT_INFO, (string) => {
      if (typeof string === 'string') {
        this.$currentCell.setTextContent(string);
      }
    });
  }

  toHTML(): string {
    return `
      <div data-current="true" class="excel-formula__current-cell"></div>
      <div class="excel-formula__formula-icon">
        <i class="material-icons">
          functions
        </i>
      </div>
      <div contenteditable data-input="true" spellcheck="false" class="excel-formula__formula-input"></div>
    `;
  }
}
