import { WQuery } from '@wquery';

export class Typer {
  changeTypeCell($cell: WQuery, type: string): void {
    const text = $cell.textContent;
    const numbers = Number(text);

    if (isNaN(numbers)) {
      if (text[text.length - 1] === '%' || text[text.length - 1] === 'р') {
        const numbers = text.slice(0, -1);
        $cell.setHtml(`${numbers}`);
      }

      return;
    }

    let per = '';
    if (type === 'percent') per = '%';
    if (type === 'ruble') per = 'р';

    $cell.setHtml(`${numbers} ${per}`);
  }
}
