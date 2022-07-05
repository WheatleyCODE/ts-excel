import { COLORS, IToolbarState, IStyle, IButton } from '@types';
import { createButtonsData } from './toolbar.buttonsData';

function createColors(meta: string, prop: string): string {
  const colors = COLORS.map(
    (color) =>
      `<div ${meta} data-value='{"${prop}":"${color}"}' style="background-color: ${color};" class="btn-dropdown__color"></div>`
  );

  return colors.join('');
}

function createDropdown(meta: string, value: false | IStyle): string | undefined {
  if (!value) return;
  const prop = Object.keys(value)[0] === 'openColorModal' ? 'color' : 'background-color';

  return `
    <div data-dropdown="true" class="excel-button__dropdown btn-dropdown">
      ${createColors(meta, prop)}
    </div>
  `;
}

function toButton({ icon, active, isWall, value, modal }: IButton): string {
  const meta = 'data-type="button"';
  const sValue = value ? `data-value='${JSON.stringify(value)}'` : '';

  return `
    <div class="excel-toolbar__button excel-button ${active ? 'active' : ''}">
      <i class="material-icons">
        ${icon}
      </i>
      <div ${sValue} ${meta} class="excel-button__shild"></div>
      ${modal ? createDropdown(meta, value) : ''}
    </div>

    ${isWall ? '<div class="excel-toolbar__wall"></div>' : ''}
  `;
}

export function createToolbar(state: IToolbarState): string {
  const buttons: IButton[] = createButtonsData(state);

  return buttons.map(toButton).join('');
}
