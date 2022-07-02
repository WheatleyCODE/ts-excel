import { IExcelHeaderState } from './ExcelHeader';

export function createExcelHeader(state: IExcelHeaderState, title: string) {
  return `
    <div class="excel-header__left-panel h-left-panel">
      <div data-logo="true" class="h-left-panel__logo"></div>
      <div class="h-left-panel__group h-group">
        <input data-input="true" value="${title}" class="h-group__input">
        <div class="h-group__menubars menubars">
          <button class="menubars__button">Файл</button>
          <button class="menubars__button">Правка</button>
          <button class="menubars__button">Вид</button>
          <button class="menubars__button">Вставка</button>
          <button class="menubars__button">Формат</button>
          <button class="menubars__button">Данные</button>
          <button class="menubars__button">Инструменты</button>
          <button class="menubars__button">Расширения</button>
          <button class="menubars__button">Справка</button>
        </div>
      </div>
    </div>
    <div class="excel-header__right-panel h-right-panel">
      <button data-remove="true" class="h-right-panel__button">Выйти</button>
      <button data-remove="true" class="h-right-panel__button">Войти</button>
      <button class="h-right-panel__share-button">
        <i class="material-icons">
          add_link
        </i>
        Общий доступ</button>
      <div class="h-right-panel__user-avatar">
        <i class="material-icons icon">
          account_circle
        </i>
      </div>
    </div>
  `;
}
