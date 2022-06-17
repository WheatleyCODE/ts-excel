import { DomListener } from './DomListener';

export abstract class ExcelComponent extends DomListener {
  abstract toHTML(): string;
}
