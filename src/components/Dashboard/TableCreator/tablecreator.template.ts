export function createTableCreator(): string {
  return `
    <div class="db-create__board db-cr-board">
      <h2 class="db-cr-board__title">Создать таблицу</h2>
      <a data-create-table="true" class="db-cr-board__link table-link">
        <div data-create-table="true" class="table-link__square"></div>
        <div data-create-table="true" class="table-link__text"><span>Пустой файл</span></div>
      </a>
      <a data-create-ivest="true" class="db-cr-board__link table-link">
        <div data-create-ivest="true" class="table-link__square"></div>
        <div data-create-ivest="true" class="table-link__text"><span>Трекер инвестиций</span></div>
      </a>
    </div>
  `;
}
