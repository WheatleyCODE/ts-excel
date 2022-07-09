import { IDashHeaderState } from './DashHeader';

function createAsideMenu() {
  return `
    <div data-modal="true" class="db-header a-menu">
      <div data-modal="true" class="icon">
        <i data-modal="true" class="material-icons">mood_bad</i>
        <h4 data-modal="true">Уупс... приложения в разработке</h4>
      </div>
    </div>
  `;
}

function createDropdown() {
  return `
    <div data-modal="true" data-modal="true" class="db-user db-dropdown">
      <div data-modal="true" class="icon">
        <i data-modal="true" class="material-icons">mood_bad</i>
        <h4 data-modal="true">Уупс... тут были наши сервисы</h4>
      </div>
    </div>
  `;
}

function createMenu(isOpen: boolean) {
  return `
   <div class="db-header__menu db-menu">
      <button data-menu="true" class="db-menu__burger-menu">
        <i data-menu="true" class="material-icons">
          menu
        </i>
      </button>
      <div class="db-menu__logo db-logo">
        <div class="db-logo__img"></div>
        <div class="db-logo__text"><h1>TypeScript Таблицы</h1></div>
      </div>
    </div>
    ${isOpen ? createAsideMenu() : ''}
  `;
}

function createServices(isOpen: boolean) {
  return `
    <div class="db-header__user db-user">
      <button data-services="true" class="db-user__apps">
        <i data-services="true" class="material-icons">
          apps
        </i>
      </button>
      <div class="db-user__user">
        <i class="material-icons">
          account_circle
        </i>
      </div>
      ${isOpen ? createDropdown() : ''}
    </div>
  `;
}

export function createDashHeader(state: IDashHeaderState) {
  return `
   ${createMenu(state.openMenu)}
   ${createServices(state.openServices)}
  `;
}
