import {ExcelComponent} from '@core/ExcelComponent';
import {$} from '../../core/dom';
import {changeCellsStyle} from '../../redux/actions';
import {createToolbar} from './toolbar.template';

export class Toolbar extends ExcelComponent {
  static className = 'toolbar';
  constructor($root, options) {
    super($root, {
      name: 'toolbar',
      listeners: ['click'],
      subscribe: ['toolbarState'],
      ...options,
    });
  }
  init() {
    super.init();
    this.buttons = this.$root.findAll('[data-type=button]');
    this.setActiveButtons(this.store.getState().toolbarState);
  }
  toHtml() {
    return createToolbar();
  }
  onClick(e) {
    const $target = $(e.target);
    if ($target.data.type === 'button') {
      this.$dispatch(
          changeCellsStyle(
              JSON.parse($target.data.value),
              this.selection.group.map(item => item.data.id)
          )
      );
    }
  }
  setActiveButtons(toolbarState) {
    Object.keys(toolbarState).forEach(key => {
      this.buttons.forEach(button => {
        const changesObj = JSON.stringify({[key]: toolbarState[key]});
        if (button.dataset.value === changesObj) {
          button.classList.add('active');
        }
      });
    });
  }
  storeChanged(changes) {
    this.buttons.forEach(button => button.classList.remove('active'));
    this.setActiveButtons(changes.toolbarState);
  }
}
