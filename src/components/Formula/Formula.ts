import { ExcelComponent } from '@core';
import { WQuery } from '@wquery';

export class Formula extends ExcelComponent {
  static classNames = ['excel__formula', 'excel-formula'];

  constructor($el: WQuery) {
    super($el, {
      name: 'Formula',
      listeners: []
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
      <div contenteditable spellcheck="false" class="excel-formula__formula-input"></div>
    `;
  }
}
