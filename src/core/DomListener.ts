export abstract class DomListener {
  public $root: Element;

  constructor($root: Element) {
    if (!$root) throw new Error('No $root privided for DomListener');

    this.$root = $root;
  }
}
