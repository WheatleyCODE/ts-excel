export function createTableCreator(): string {
  const id = Date.now().toString();

  return `
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
  `;
}
