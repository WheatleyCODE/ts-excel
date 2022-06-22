import { EventNames, ExcelComponent } from '@core';
import { WQuery } from '@wquery';
import { EventKeys, IExcelComOptions } from '@types';

export class Formula extends ExcelComponent {
  static classNames = ['excel__formula', 'excel-formula'];
  private $input!: WQuery;

  constructor($el: WQuery, options: IExcelComOptions) {
    super($el, {
      name: 'Formula',
      listeners: ['input', 'keydown'],
      ...options
    });
  }

  onInput() {
    this.emit(EventNames.FORMULA_INPUT, this.$input.getTextContent());
  }

  onKeydown(e: KeyboardEvent) {
    if (e.key === EventKeys.ENTER || e.key === EventKeys.TAB) {
      e.preventDefault();

      this.emit(EventNames.FORMULA_TAB_OR_ENTER_PRESS);
    }
  }

  componentDidMount() {
    super.componentDidMount();

    const $input = this.$root.find('[data-input]');
    if (!$input) return;
    this.$input = $input;

    this.on(EventNames.TABLE_CELECT_CELL, (string) => {
      if (typeof string === 'string') {
        this.$input.setTextContent(string);
      }
    });

    this.on(EventNames.TABLE_INPUT, (string) => {
      if (typeof string === 'string') {
        this.$input.setTextContent(string);
      }
    });
  }

  toHTML() {
    return `
      <div class="excel-formula__current-cell"></div>
      <div class="excel-formula__formula-icon">
        <i class="material-icons">
          functions
        </i>
      </div>
      <div contenteditable data-input="true" spellcheck="false" class="excel-formula__formula-input"></div>
    `;
  }
}
