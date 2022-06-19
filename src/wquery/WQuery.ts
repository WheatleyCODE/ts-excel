export class WQuery {
  private $nativeElement: Element;

  constructor(selector: string | Element) {
    if (typeof selector === 'string') {
      const node = document.querySelector(selector);
      if (!node)
        throw new Error(`WQuery: Node is not defined, Element is not found. Selector: ${selector}`);
      this.$nativeElement = node;
      return;
    }

    this.$nativeElement = selector;
  }

  html(html?: string): string | WQuery {
    if (typeof html === 'string') {
      this.$nativeElement.innerHTML = html;
      return this;
    }

    return this.$nativeElement.outerHTML.trim();
  }

  append(node: WQuery | Element | string): WQuery {
    if (node instanceof WQuery) {
      this.$nativeElement.append(node.$nativeElement);
      return this;
    }

    this.$nativeElement.append(node);
    return this;
  }

  getNativeElement(): Element {
    return this.$nativeElement;
  }
}

export function $(selector: string | Element): WQuery {
  return new WQuery(selector);
}

$.create = (tagName: string, classes?: string | string[]): WQuery => {
  const $el = document.createElement(tagName);

  if (classes) {
    if (Array.isArray(classes)) {
      classes.forEach((className) => $el.classList.add(className));
      return $($el);
    }

    $el.classList.add(classes);
  }

  return $($el);
};
