import { WQuery } from '@wquery';

export abstract class DomListener {
  public $root: WQuery;

  constructor($root: WQuery) {
    if (!$root) throw new Error('No $root privided for DomListener');

    this.$root = $root;
  }
}
