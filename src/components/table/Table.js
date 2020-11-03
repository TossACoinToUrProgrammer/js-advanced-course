import {ExcelComponent} from '@core/ExcelComponent';
import {$} from '../../core/dom';
import * as actions from '@/redux/actions';
import {
  nextSelector,
  shouldResize,
  shouldSelect,
  shouldSelectionResize} from './table.functions';
import {tableResizeHandler} from './table.resize';
import {createTable} from './table.template.ts';
import {changeCell, toolbarChange} from '../../redux/actions';

export class Table extends ExcelComponent {
  static className = 'table'

  constructor($root, options) {
    super($root, {
      listeners: ['mousedown', 'keydown', 'input'],
      subscribe: ['cells'],
      ...options,
    });
  }

  toHtml() {
    return createTable(20, this.store.getState());
  }

  prepare() {
    console.log('prepare');
  }
  setCellsStyles(cells) {
    Object.keys(cells).forEach(key => {
      const cell = cells[key];
      if (cell.style) {
        const $cell = this.$root.find(`[data-id="${key}"]`);
        $cell.css(cell.style);
      }
    });
  }
  init() {
    super.init();
    console.log('init');
    this.$el = this.$root.find('[data-id="0:0"]');
    this.selectCell(this.$el);

    this.$on('formula:input', text => {
      this.selection.current.text(text);
      this.$dispatch(changeCell(text, this.selection.current.data.id));
    });
    this.$on('formula:pressedEnter', () => {
      this.selection.current.focus();
    });
    this.setCellsStyles(this.store.getState().cells);
  }
  storeChanged(changes) {
    this.setCellsStyles(changes.cells);
  }
  selectCell($cell) {
    this.selection.select($cell);
    this.$emit('table:input', this.selection.current);
    this.$dispatch(
        toolbarChange(
            this.selection.current.data.id
        )
    );
  }
  async resizeHandler(event) {
    const resolve = await tableResizeHandler(this.$root, event.target);
    this.$dispatch(actions.tableResize(resolve));
  }
  onMousedown(event) {
    if (shouldResize(event)) {
      this.resizeHandler(event);
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
