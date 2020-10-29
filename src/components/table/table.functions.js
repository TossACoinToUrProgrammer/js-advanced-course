export const shouldResize = (event) => event.target.dataset.resize;
export const shouldSelectionResize = (event) => {
  return event.target.className === 'selection-resize-btn' ||
  event.shiftKey && event.target.classList.contains('cell');
};
export const shouldSelect = (event) => {
  return event.target.classList.contains('cell');
};
export function nextSelector(key, {col, row}) {
  switch (key) {
    case 'Enter':
    case 'ArrowDown':
      row++;
      break;
    case 'Tab':
    case 'ArrowRight':
      col++;
      break;
    case 'ArrowLeft':
      col--;
      break;
    case 'ArrowUp':
      row--;
      break;
  }

  return `[data-id="${row}:${col}"]`;
}
