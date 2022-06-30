import { Page } from '@core';
import { $ } from '@wquery';

export class DashboardPage extends Page {
  initPage() {}
  destroyPage() {}

  getRoot() {
    return $.create('div', 'db').setHtml(`
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
          <a href="#excel" class="db-cr-board__link table-link">
            <div class="table-link__square"></div>
            <div class="table-link__text"><span>Пустой файл</span></div>
          </a>
          <a href="#excel" class="db-cr-board__link table-link">
            <div class="table-link__square"></div>
            <div class="table-link__text"><span>Список дел</span></div>
          </a>
          <a href="#excel" class="db-cr-board__link table-link">
            <div class="table-link__square"></div>
            <div class="table-link__text"><span>Трекер инвестиций</span></div>
          </a>
          <a href="#excel" class="db-cr-board__link table-link">
            <div class="table-link__square"></div>
            <div class="table-link__text"><span>Годовой бюджет</span></div>
          </a>
          <a href="#excel" class="db-cr-board__link table-link">
            <div class="table-link__square"></div>
            <div class="table-link__text"><span>Календарь</span></div>
          </a>
        </div>
      </div>
      <div class="db__list db-list">
        <div class="db-list__board db-li-board">
          <div class="db-li-board__table db-table">
            <ul class="db-table__ul">
              <li class="db-table__li db-li-table">
                <div class="db-li-table__content db-li-content">
                  <div class="db-li-content__icon"></div>
                  <div class="db-li-content__title">Новая таблица</div>
                </div>
              </li>
              <li class="db-table__li db-li-table">
                <div class="db-li-table__content db-li-content">
                  <div class="db-li-content__icon"></div>
                  <div class="db-li-content__title">Старая таблица</div>
                </div>
              </li>
              <li class="db-table__li db-li-table">
                <div class="db-li-table__content db-li-content">
                  <div class="db-li-content__icon"></div>
                  <div class="db-li-content__title">Еще не новая таблица</div>
                </div>
              </li>
              <li class="db-table__li db-li-table">
                <div class="db-li-table__content db-li-content">
                  <div class="db-li-content__icon"></div>
                  <div class="db-li-content__title">Забытая таблица</div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    `);
  }
}
