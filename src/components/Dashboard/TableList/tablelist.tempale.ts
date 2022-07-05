import { ICombinedState } from '@types';
import { storage } from '@utils';

function getAllKeys() {
  const keys = [];

  for (let i = 0; i < storage.length; i++) {
    const key = storage.key(i);
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
      const model: ICombinedState = storage.get(key);
      const { excelState } = model;

      return `
        <li class="db-table__li db-li-table">
          <a href="#${excel}/${1020}">
            <div class="db-li-table__content db-li-content">
              <div class="db-li-content__icon"></div>
              <div class="db-li-content__title">${excelState.title}</div>
              <div>
                ${new Date(excelState.openDate).toLocaleDateString()}
                ${new Date(excelState.openDate).toLocaleTimeString()}
              </div>
            </div>
          </a>
        </li>`;
    })
    .join(' ');
}

function createTableListItems() {
  return `
    <ul class="db-table__ul">
      ${createRecordsTable()}
    </ul>
  `;
}

export function createTableList() {
  return `
    <div class="db-list__board db-li-board">
      <div class="db-li-board__table db-table">
        ${createTableListItems()}
      </div>
    </div>
  `;
}
