import { WQuery } from '@wquery';
import { Component } from '@core/Component';
import { Parser } from '@core/Parser';
import { IExcelOptions } from '@types';

export abstract class ExcelComponent extends Component {
  public parser: Parser;

  constructor($el: WQuery, options: IExcelOptions) {
    super($el, options);

    this.parser = options.parser;
  }
}
