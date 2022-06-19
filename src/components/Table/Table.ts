import { ExcelComponent } from '@core';
import { WQuery } from '@wquery';

export class Table extends ExcelComponent {
  static classNames = ['excel__table', 'excel-table'];

  constructor($el: WQuery) {
    super($el);
  }

  toHTML() {
    return `
      <div class="excel-table__row row">
        <div class="row__info"></div>
        <div class="row__data data">
          <div class="data__column">
            A
          </div>
          <div class="data__column">
            B
          </div>
          <div class="data__column">
            C
          </div>
          <div class="data__column">
            D
          </div>
        </div>
      </div>

      <div class="excel-table__row row">
        <div class="row__info">
          1
        </div>
        <div class="row__data data">
          <div contenteditable class="data__cell selected">A1</div>
          <div contenteditable class="data__cell">B1</div>
          <div contenteditable class="data__cell">C1</div>
          <div contenteditable class="data__cell">D1</div>
        </div>
      </div>

      <div class="excel-table__row row">
        <div class="row__info">
          2
        </div>
        <div class="row__data data">
          <div contenteditable class="data__cell">A2</div>
          <div contenteditable class="data__cell">B2</div>
          <div contenteditable class="data__cell">C3</div>
          <div contenteditable class="data__cell">D4</div>
        </div>
      </div>
    `;
  }
}
