import {ExcelComponent} from '@core/ExcelComponent';
import {shouldResize} from './table.functions';
import {tableResizeHandler} from './table.resize';
import {createTable} from './table.template.ts';

export class Table extends ExcelComponent {
  static className = 'table'

  constructor($root) {
    super($root, {
      listeners: ['mousedown'],
    });
  }

  toHtml() {
    return createTable(20);
  }

  onMousedown(event) {
    if (shouldResize(event)) {
      tableResizeHandler(this.$root, event.target);
    }
  }
}
