import { ExcelComponent } from '@core';
import { WQuery } from '@wquery';
import { IExcelComOptions } from '@types';

export class Toolbar extends ExcelComponent {
  static classNames = ['excel__toolbar', 'excel-toolbar'];

  constructor($el: WQuery, options: IExcelComOptions) {
    super($el, {
      name: 'Table',
      listeners: [],
      ...options
    });
  }

  toHTML(): string {
    return `
      <div class="excel-toolbar__button">
        <i class="material-icons">
          undo
        </i>
      </div>
      <div class="excel-toolbar__button">
        <i class="material-icons">
          redo
        </i>
      </div>
      <div class="excel-toolbar__button">
        <i class="material-icons">
          print
        </i>
      </div>
      <div class="excel-toolbar__button">
        <i class="material-icons">
          format_paint
        </i>
      </div>

      <div class="excel-toolbar__wall"></div>

      <div class="excel-toolbar__button">
        <i class="material-icons">
          currency_ruble
        </i>
      </div>
      <div class="excel-toolbar__button">
        <i class="material-icons">
          percent
        </i>
      </div>
      <div class="excel-toolbar__button">
        <i class="material-icons">
          chevron_left
        </i>
      </div>
      <div class="excel-toolbar__button">
        <i class="material-icons">
          chevron_right
        </i>
      </div>

      <div class="excel-toolbar__wall"></div>

      <div class="excel-toolbar__button">
        <i class="material-icons">
          format_bold
        </i>
      </div>
      <div class="excel-toolbar__button">
        <i class="material-icons">
          format_italic
        </i>
      </div>
      <div class="excel-toolbar__button">
        <i class="material-icons">
          strikethrough_s
        </i>
      </div>
      <div class="excel-toolbar__button">
        <i class="material-icons">
          format_underlined
        </i>
      </div>

      <div class="excel-toolbar__wall"></div>

      <div class="excel-toolbar__button">
        <i class="material-icons">
          format_color_text
        </i>
      </div>
      <div class="excel-toolbar__button">
        <i class="material-icons">
          format_color_fill
        </i>
      </div>

      <div class="excel-toolbar__wall"></div>

      <div class="excel-toolbar__button">
        <i class="material-icons">
          border_all
        </i>
      </div>
      <div class="excel-toolbar__button">
        <i class="material-icons">
          format_align_left
        </i>
      </div>
      <div class="excel-toolbar__button">
        <i class="material-icons">
          format_align_center
        </i>
      </div>
      <div class="excel-toolbar__button">
        <i class="material-icons">
          format_align_right
        </i>
      </div>

      <div class="excel-toolbar__wall"></div>

      <div class="excel-toolbar__button">
        <i class="material-icons">
          align_vertical_bottom
        </i>
      </div>
      <div class="excel-toolbar__button">
        <i class="material-icons">
          align_vertical_center
        </i>
      </div>
      <div class="excel-toolbar__button">
        <i class="material-icons">
          align_vertical_top
        </i>
      </div>
    `;
  }
}
