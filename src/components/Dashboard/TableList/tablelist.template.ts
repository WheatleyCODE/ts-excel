import { IExcelState } from '@types';

function createRecordsTable(excels: IExcelState[]) {
  if (!excels.length) {
    return '<h2>Вы не создали не одной таблицы</h2>';
  }

  return excels
    .map((excel) => {
      return `
        <li class="db-table__li db-li-table">
          <a href="#excel/${excel.id}">
            <div class="db-li-table__content db-li-content">
              <div class="db-li-content__icon"></div>
              <div class="db-li-content__title">${excel.title}</div>
              <div class="db-li-content__data">
                <div class="date">${new Date(excel.openDate).toLocaleDateString()}</div>
                <div class="time">${new Date(excel.openDate).toLocaleTimeString()}</div>
              </div>
              <div data-delete-id="${excel.id}" class="db-li-content__delete">
                <i data-delete-id="${excel.id}" data-menu="true" class="material-icons">
                  delete
                </i>
              </div>
            </div>
          </a>
        </li>`;
    })
    .join(' ');
}

function createTableListItems(excels: IExcelState[]) {
  return `
    <ul class="db-table__ul">
      ${createRecordsTable(excels)}
    </ul>
  `;
}

export function createTableList(excels: IExcelState[]) {
  return `
    <div class="db-list__board db-li-board">
      <div class="db-li-board__table db-table">
        ${createTableListItems(excels)}
      </div>
    </div>
  `;
}
