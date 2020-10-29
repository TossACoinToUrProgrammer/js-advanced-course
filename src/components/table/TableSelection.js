/* eslint-disable max-len */
import {$} from '../../core/dom';

export class TableSelection {
  static className = 'selected';
  constructor() {
    this.group = [];
    this.current;
    // eslint-disable-next-line max-len
    this.$resizeBtn =
      '<div class="selection-resize-btn" contenteditable=false></div>';
  }

  select($el) {
    this.clear();
    $el.addClass(TableSelection.className);
    $el.insert('beforeend', this.$resizeBtn);
    $el.focus();
    this.current = $el;
    this.group.push($el);
  }

  clear() {
    this.group.forEach((item) => {
      const resizeBtn = item.find('.selection-resize-btn');
      if (resizeBtn.$el) resizeBtn.remove();
      item.removeClass(TableSelection.className);
    });
    this.group = [];
  }

  _getFilteredCells($table, currentCol, currentRow) {
    const $newCells =[];
    let {col, row} = this.current.data;
    currentCol = parseInt(currentCol);
    currentRow = parseInt(currentRow);
    row = parseInt(row);
    col = parseInt(col);

    const top = row <= currentRow ? row : currentRow;
    const bottom = row > currentRow ? row : currentRow;
    const left = col < currentCol ? col : currentCol;
    const right = col >= currentCol ? col : currentCol;

    for (let i = top; i <= bottom; i++) {
      for (let j = left; j <= right; j++) {
        const $cell = $table.find(`[data-id='${i}:${j}']`);
        $newCells.push($cell);
      }
    }
    return $newCells;
  }

  _selectCellsGroup($cells) {
    $cells.forEach(item => {
      item.addClass(TableSelection.className);
      this.group.push(item);
    });
  }

  _groupSelectionHandler(e, $table) {
    const $current = $(e.target);
    if ($current.data && $current.data.id) {
      this.clear();
      const {row: currentRow, col: currentCol} = $current.data;
      const $cells = this._getFilteredCells($table, currentCol, currentRow);
      this._selectCellsGroup($cells);
    }
  }

  selectGroup($table, event) {
    if (event.shiftKey) {
      this._groupSelectionHandler(event, $table);
    } else {
      let check;
      document.onmousemove = (e) => {
        if (e.target !== check) { // если элемент на котором находится курсор не поменялся, то дальнейшие действия не будут выполнены
          check = e.target;
          this._groupSelectionHandler(e, $table);
        }
      };
      document.onmouseup = () => {
        document.onmousemove = null;
        document.onmouseup = null;
      };
    }
  }
}
