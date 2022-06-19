class WUtils {
  private methodPrefix = 'on';

  createDOMListenerMethodName(string: string) {
    return this.methodPrefix + this.capitalize(string);
  }

  capitalize(string: string) {
    return string[0].toLocaleUpperCase() + string.slice(1);
  }
}

export const wutils = new WUtils();
