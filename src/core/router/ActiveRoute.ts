export class ActiveRoute {
  static get path() {
    return window.location.hash.slice(1);
  }

  static get pathName() {
    return this.path.split('/').shift() || '';
  }

  static get params(): string[] {
    const arr = this.path.split('/');
    arr.shift();

    return arr;
  }

  static get firstParam(): string {
    return this.params[0];
  }

  static navigation(path: string) {
    window.location.hash = path;
  }
}
