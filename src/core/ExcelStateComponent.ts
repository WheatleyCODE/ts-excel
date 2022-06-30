import { ExcelComponent } from './ExcelComponent';

export abstract class ExcelStateComponent<X extends object> extends ExcelComponent {
  private state!: X;

  abstract get template(): string;

  initComponentState(initialState: X): void {
    this.state = { ...initialState };
    this.$root.setHtml(this.template);
  }

  setComponentState(newState: X): void {
    if (!this.state) {
      throw new Error(`State not initialized in ${this.options.name} Component`);
    }

    this.state = { ...newState };
    this.$root.setHtml(this.template);
  }

  getComponentState(): X {
    if (!this.state) {
      throw new Error(`State not initialized in ${this.options.name} Component`);
    }

    return { ...this.state };
  }
}
