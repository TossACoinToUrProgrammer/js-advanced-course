import {ExcelComponent} from '@core/ExcelComponent';
import {createTable} from './table.template.ts';

export class Table extends ExcelComponent {
  static className = 'table';

  toHtml() {
    return createTable(10);
  }
}
