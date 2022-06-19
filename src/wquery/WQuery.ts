class WQuery {
  constructor() {
    console.log('object');
  }
}

export function $() {
  return new WQuery();
}

$.create = (tagName: string, classes?: string | string[]): HTMLElement => {
  const $el = document.createElement(tagName);

  if (classes) {
    if (Array.isArray(classes)) {
      classes.forEach((className) => $el.classList.add(className));
      return $el;
    }

    $el.classList.add(classes);
  }

  return $el;
};
