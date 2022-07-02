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
