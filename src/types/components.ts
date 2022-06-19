import { ExcelComponent } from '@core';
export class IComponent extends ExcelComponent {
  static classNames = ['', ''];

  toHTML() {
    return '';
  }
}

export interface IOptions {
  components: typeof IComponent[];
}
