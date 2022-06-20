import { IWQueryListeners } from '@types';

export class WQuery {
  private $nativeElement: HTMLElement;
  private listeners: IWQueryListeners = {};

  constructor(selector: string | HTMLElement | Element) {
    if (typeof selector === 'string') {
      const node = document.querySelector(selector);
      if (!node)
        throw new Error(`WQuery: Node is not defined, Element is not found. Selector: ${selector}`);
      this.$nativeElement = node as HTMLElement;
      return;
    }

    this.$nativeElement = selector as HTMLElement;
  }

  html(html?: string): string | WQuery {
    if (typeof html === 'string') {
      this.$nativeElement.innerHTML = html;
      return this;
    }

    return this.$nativeElement.outerHTML.trim();
  }

  append(node: WQuery | Element | HTMLElement | string): WQuery {
    if (node instanceof WQuery) {
      this.$nativeElement.append(node.$nativeElement);
      return this;
    }

    this.$nativeElement.append(node);
    return this;
  }

  on(eventType: string, callback: () => void) {
    this.listeners[eventType] = callback;
    this.$nativeElement.addEventListener(eventType, callback);
  }

  off(eventType: string) {
    this.$nativeElement.removeEventListener(eventType, this.listeners[eventType]);
  }

  getNativeElement(): HTMLElement {
    return this.$nativeElement;
  }

  getParent(selector?: string): WQuery | null {
    if (selector) {
      const $node = this.$nativeElement.closest(selector);
      if (!$node) return null;
      return $($node);
    }

    const $node = this.$nativeElement.parentNode as Element;
    if (!$node) return null;
    return $($node);
  }

  getCoords(): DOMRect {
    return this.$nativeElement.getBoundingClientRect();
  }

  css(styles: { [x: string]: string } = {}): WQuery {
    Object.keys(styles).forEach((key) => {
      const value = styles[key];
      this.$nativeElement.style[key] = value;
    });
    return this;
  }

  getStyles(styles: string[]): { [propName: string]: string } {
    return styles.reduce((acc, style) => {
      acc[style] = this.$nativeElement.style[style];
      return acc;
    }, {});
  }

  addClass(className: string): WQuery {
    this.$nativeElement.classList.add(className);
    return this;
  }

  removeClass(className: string): WQuery {
    this.$nativeElement.classList.remove(className);
    return this;
  }
}

export function $(selector: string | HTMLElement | Element): WQuery {
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
