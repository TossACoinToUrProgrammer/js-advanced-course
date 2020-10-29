import {ExcelComponent} from '@core/ExcelComponent';
import {$} from '../../core/dom';
import {
  nextSelector,
  shouldResize,
  shouldSelect,
  shouldSelectionResize} from './table.functions';
import {tableResizeHandler} from './table.resize';
import {createTable} from './table.template.ts';
import {TableSelection} from './TableSelection';

export class Table extends ExcelComponent {
  static className = 'table'

  constructor($root, options) {
    super($root, {
      listeners: ['mousedown', 'keydown', 'input'],
      ...options,
    });
  }

  toHtml() {
    return createTable(20);
  }

  prepare() {
    console.log('prepare');
    this.selection = new TableSelection();
  }

  init() {
    super.init();
    console.log('init');
    this.$el = this.$root.find('[data-id="0:0"]');
    this.selectCell(this.$el);

    this.$on('formula:input', text => {
      this.selection.current.text(text);
    });
    this.$on('formula:pressedEnter', () => {
      this.selection.current.focus();
    });
  }
  selectCell($cell) {
    this.selection.select($cell);
    this.$emit('table:input', this.selection.current);
  }
  onMousedown(event) {
    if (shouldResize(event)) {
      tableResizeHandler(this.$root, event.target);
    } else if (shouldSelectionResize(event)) {
      this.selection.selectGroup(this.$root, event);
    } else if (shouldSelect(event)) {
      this.selectCell($(event.target));
    }
  }
  onKeydown(event) {
    const keys = [
      'Enter',
      'Tab',
      'ArrowLeft',
      'ArrowRight',
      'ArrowDown',
      'ArrowUp',
    ];

    const {key} = event;

    if (keys.includes(key) && !event.shiftKey) {
      event.preventDefault();
      const id = this.selection.current.id(true);
      const $next = this.$root.find(nextSelector(key, id));
      if ($next.$el) {
        this.selectCell($next);
      }
    }
  }
  onInput() {
    this.$emit('table:input', this.selection.current);
  }
}
