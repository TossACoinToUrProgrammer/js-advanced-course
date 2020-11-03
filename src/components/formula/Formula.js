import {ExcelComponent} from '@core/ExcelComponent';
import {$} from '../../core/dom';
import {changeCell} from '../../redux/actions';

export class Formula extends ExcelComponent {
  static className = 'formula';
  constructor($root, options) {
    super($root, {
      name: 'Formula',
      listeners: ['input', 'keydown'],
      ...options,
    });
  }
  toHtml() {
    return `
      <div class="formula__info">
        fx
      </div>
      <div class="formula__input" contenteditable>
        ${this.selection.current && this.selection.current.text() || ''}
      </div>
    `;
  }
  init() {
    super.init();
    this.$input = this.$root.find('.formula__input');
    this.$on('table:input', $el => {
      this.$input.text($el.text());
      this.$dispatch(changeCell($el.text(), this.selection.current.data.id));
    });
  }
  onInput(event) {
    this.$emit('formula:input', $(event.target).text());
  }
  onKeydown(event) {
    if (event.key === 'Enter') {
      event.preventDefault();
      this.$emit('formula:pressedEnter', null);
    }
  }
}
