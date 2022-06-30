import { IState } from '@types';
import { wutils } from '@utils';
function getAllKeys() {
  const keys = [];

  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (!key?.includes('excel')) continue;

    keys.push(key);
  }

  return keys;
}

function createRecordsTable() {
  const keys = getAllKeys();

  if (!keys.length) {
    return '<h2>Вы не создали не одной таблицы</h2>';
  }

  return keys
    .map((key) => {
      const [excel, id] = key.split(':');
      const model: IState = wutils.storage(key);

      return `
        <li class="db-table__li db-li-table">
          <a href="#${excel}/${id}">
            <div class="db-li-table__content db-li-content">
              <div class="db-li-content__icon"></div>
              <div class="db-li-content__title">${model.title}</div>
              <div>
                ${new Date(model.openDate).toLocaleDateString()}
                ${new Date(model.openDate).toLocaleTimeString()}
              </div>
            </div>
          </a>
        </li>`;
    })
    .join(' ');
}

function createTableList() {
  return `
    <ul class="db-table__ul">
      ${createRecordsTable()}
    </ul>
  `;
}

export function createDashboard(): string {
  const id = Date.now().toString();

  return `
    <div class="db__header db-header">
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
    </div>
    <div class="db__create db-create">
      <div class="db-create__board db-cr-board">
        <h2 class="db-cr-board__title">Создать таблицу</h2>
        <a href="#excel/${id}" class="db-cr-board__link table-link">
          <div class="table-link__square"></div>
          <div class="table-link__text"><span>Пустой файл</span></div>
        </a>
        <a href="#excel/${id}" class="db-cr-board__link table-link">
          <div class="table-link__square"></div>
          <div class="table-link__text"><span>Список дел</span></div>
        </a>
        <a href="#excel/${id}" class="db-cr-board__link table-link">
          <div class="table-link__square"></div>
          <div class="table-link__text"><span>Трекер инвестиций</span></div>
        </a>
        <a href="#excel${id}" class="db-cr-board__link table-link">
          <div class="table-link__square"></div>
          <div class="table-link__text"><span>Годовой бюджет</span></div>
        </a>
        <a href="#excel/${id}" class="db-cr-board__link table-link">
          <div class="table-link__square"></div>
          <div class="table-link__text"><span>Календарь</span></div>
        </a>
      </div>
    </div>
    <div class="db__list db-list">
      <div class="db-list__board db-li-board">
        <div class="db-li-board__table db-table">
          ${createTableList()}
        </div>
      </div>
    </div>
  `;
}
