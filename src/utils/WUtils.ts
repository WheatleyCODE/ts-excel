class WUtils {
  private methodPrefix = 'on';

  createDOMListenerMethodName(string: string) {
    return this.methodPrefix + this.capitalize(string);
  }

  capitalize(string: string) {
    return string[0].toLocaleUpperCase() + string.slice(1);
  }
  splitAndToInt(string: string, separator: string): number[] {
    return string.split(separator).map((str) => +str);
  }
}

export const wutils = new WUtils();
