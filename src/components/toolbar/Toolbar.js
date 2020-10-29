import {ExcelComponent} from '@core/ExcelComponent';

export class Toolbar extends ExcelComponent {
  static className = 'toolbar';
  constructor($root, options) {
    super($root, {
      name: 'toolbar',
      ...options,
    });
  }
  toHtml() {
    return `
      <div class="button">
        <i title="Удалить" class="material-icons">format_align_left</i>
      </div>
      <div class="button">
        <i title="Удалить" class="material-icons">format_align_center</i>
      </div>
      <div class="button">
        <i title="Выйти" class="material-icons"> format_align_right </i>
      </div>
      <div class="button">
        <i title="Выйти" class="material-icons"> format_bold </i>
      </div>
      <div class="button">
        <i title="Удалить" class="material-icons">format_italic</i>
      </div>
      <div class="button">
        <i title="Выйти" class="material-icons"> format_underline </i>
      </div>
    `;
  }
}
