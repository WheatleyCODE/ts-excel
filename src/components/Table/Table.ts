import { ExcelComponent } from '@core';
import { $, WQuery } from '@wquery';
import { createTable } from './table.template';

export class Table extends ExcelComponent {
  static classNames = ['excel__table', 'excel-table'];

  constructor($el: WQuery) {
    super($el, {
      name: 'Table',
      listeners: ['mousedown', 'mouseup']
    });
  }

  onMousedown(e: MouseEvent): void {
    if (!(e.target instanceof HTMLDivElement)) {
      return;
    }

    if (e.target.dataset.resize) {
      const $resizer = $(e.target);
      const $parent = $resizer.getParent('[data-type="resizable"]');

      if (!$parent) return;
      const coords = $parent.getCoords();

      const mouseMoveCallBack = (e: MouseEvent) => {
        const delta = e.pageX - coords.right;

        $parent.css({
          width: coords.width + delta + 'px'
        });
      };

      document.onmousemove = mouseMoveCallBack;
    }
  }

  onMouseup(): void {
    document.onmousemove = null;
  }

  toHTML(): string {
    return createTable(60, 30);
  }
}
