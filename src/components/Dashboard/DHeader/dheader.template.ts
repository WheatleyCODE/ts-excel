export function createDHeader() {
  return `
    <div class="db-header__menu db-menu">
      <button class="db-menu__burger-menu">
        <i class="material-icons">
          menu
        </i>
      </button>
      <div class="db-menu__logo db-logo">
        <div class="db-logo__img"></div>
        <div class="db-logo__text"><h1>TypeScript Таблицы</h1></div>
      </div>
    </div>
    <div class="db-header__search db-search">
      <div class="db-search__search-icon">
        <i class="material-icons">
          search
        </i>
      </div>
      <input class="db-search__input" type="text" placeholder="Поиск">
    </div>
    <div class="db-header__user db-user">
      <button class="db-user__apps">
        <i class="material-icons">
          apps
        </i>
      </button>
      <div class="db-user__user">
        <i class="material-icons">
          account_circle
        </i>
      </div>
    </div>
  `;
}
