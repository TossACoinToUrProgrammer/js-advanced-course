import {ExcelComponent} from '@core/ExcelComponent';

export class Formula extends ExcelComponent {
  static className = 'formula';
  constructor($root) {
    super($root, {
      name: 'Formula',
      listeners: ['input'],
    });
  }
  toHtml() {
    return `
      <div class="formula__info">
        fx
      </div>
      <div class="formula__input" contenteditable>

      </div>
    `;
  }

  onInput(event) {
    console.log(this.$root);
    console.log('Formula onInput', event.target.innerText);
  }
}
