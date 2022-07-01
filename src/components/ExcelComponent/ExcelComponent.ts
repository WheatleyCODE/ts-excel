import { WQuery } from '@wquery';
import { Component } from '@core/Component';
import { Parser } from '@core/Parser';
import { IComOptions } from '@types';

export abstract class ExcelComponent extends Component {
  public parser: Parser;

  constructor($el: WQuery, options: IComOptions) {
    super($el, options);

    this.parser = options.parser;
  }
}
