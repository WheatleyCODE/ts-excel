import { toolbartStylesArr, IWQueryListeners, StyleName } from '@types';

export class WQuery {
  private $nativeElement: HTMLElement;
  private listeners: IWQueryListeners = {};

  constructor(selector: string | HTMLElement) {
    if (typeof selector === 'string') {
      const node = document.querySelector<HTMLElement>(selector);
      if (!node)
        throw new Error(`WQuery: Node is not defined, Element is not found. Selector: ${selector}`);
      this.$nativeElement = node;
      return;
    }

    this.$nativeElement = selector;
  }

  setHtml(html: string): WQuery {
    this.$nativeElement.innerHTML = html;
    return this;
  }

  getHtml(): string {
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

  get nativeElement(): HTMLElement {
    return this.$nativeElement;
  }

  getParent(selector?: string): WQuery | null {
    if (selector) {
      const $node = this.$nativeElement.closest<HTMLElement>(selector);
      if (!$node) return null;
      return $($node);
    }

    const $node = this.$nativeElement.parentNode as HTMLElement;
    if (!$node) return null;
    return $($node);
  }

  get coords(): DOMRect {
    return this.$nativeElement.getBoundingClientRect();
  }

  css(styles: { [x: string]: string | boolean }): WQuery {
    Object.keys(styles).forEach((key) => {
      const value = styles[key];
      this.$nativeElement.style[key] = value;
    });

    return this;
  }

  getStyles(styles: StyleName[] = toolbartStylesArr): { [key: string]: string } {
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

  clear(): WQuery {
    this.setHtml('');
    return this;
  }

  focus(): WQuery {
    this.$nativeElement.focus();
    return this;
  }

  get data(): DOMStringMap {
    return this.$nativeElement.dataset;
  }

  setAttr(attrName: string, value: string): WQuery {
    this.$nativeElement.setAttribute(attrName, value);
    return this;
  }

  getAttr(attrName: string): string | null {
    return this.$nativeElement.getAttribute(attrName);
  }

  find(selector: string): WQuery | null {
    const elem = this.$nativeElement.querySelector<HTMLElement>(selector);
    if (elem === null) return null;
    return $(elem);
  }

  findAll(selector: string): WQuery[] {
    const nodeList = this.$nativeElement.querySelectorAll(selector) as NodeListOf<HTMLElement>;
    const classArr: WQuery[] = [];
    nodeList.forEach((elem) => classArr.push($(elem)));
    return classArr;
  }

  get textContent(): string {
    const text = this.$nativeElement.textContent || '';
    return text.trim();
  }

  setTextContent(string: string): WQuery {
    const childsArr = this.$nativeElement.children as any;
    const childrens = [...childsArr];

    this.$nativeElement.textContent = string;
    childrens.forEach((child) => this.$nativeElement.append(child));
    return this;
  }
}

export function $(selector: string | HTMLElement): WQuery {
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
