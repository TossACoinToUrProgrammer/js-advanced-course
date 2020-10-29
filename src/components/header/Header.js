import {ExcelComponent} from '@core/ExcelComponent';

export class Header extends ExcelComponent {
  static className = 'header';
  constructor($root, options) {
    super($root, {
      name: 'header',
      ...options,
    });
  }

  toHtml() {
    return `
      <input title="Название таблицы" type="text" class="header__input" />
      <div>
        <div class="button">
          <i title="Удалить" class="material-icons">delete</i>
        </div>
        <div class="button">
          <i title="Выйти" class="material-icons"> exit_to_app </i>
        </div>
      </div>
    `;
  }
}
