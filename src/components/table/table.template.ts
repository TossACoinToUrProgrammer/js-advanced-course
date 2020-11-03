interface CODES {
  A:number
  Z:number
}
const CODES: CODES = {
  A: 65,
  Z: 90,
};
function setInitialSize(state: any = {}, index: number, type: string): string {
  return `${state[index] ? `style = '${type}: ${state[index]}px' ` : ''}`;
}
function setInitialHeight(state: any, index: number) {
  return setInitialSize(state, index, 'height');
}
function setInitialWidth(state: any, index: number) {
  return setInitialSize(state, index, 'width');
}
function setInitialCellText(state: any = {}, id: string) {
  return state[id] ? state[id].text : '';
}
function toCell(row:number, state: any = {}) {
  return (_: any, col: number):string => {
    const id = row+':'+col;
    return `
      <div 
        class="cell" 
        ${setInitialWidth(state.colState, col)} 
        data-row='${row}' 
        data-id='${id}' 
        data-col='${col}' 
        contenteditable
        >
      ${setInitialCellText(state.cells, id)}
      </div>
    `;
  }
}

function toColumn(state: any = {}) {
  return (col: string, index: number): string => {
    return `
      <div class="column" ${setInitialWidth(state, index)} data-col='${index}' data-type="resizable">${col}<div class='col-resize' data-resize='col'></div></div>
    `;
  }
}

function createRow(index: number, content: string, state: any = {}): string {
  return `
    <div class="row" ${setInitialHeight(state, index)} data-row=${index} data-type="resizable">
      <div class="row-info">${index ? index + "<div class='row-resize' data-resize='row'></div>" : ''}</div>
      <div class="row-data">${content}</div>
    </div>
  `;
}

function toChar(_: any, index: number): string {
  return String.fromCharCode(CODES.A + index);
}

export function createTable(rowsCount: number = 15, state: any): string {
  const colsCount = CODES.Z - CODES.A + 1;
  const rows = [];

  const cols = new Array(colsCount)
      .fill('')
      .map(toChar)
      .map(toColumn(state.colState))
      .join('');

  rows.push(createRow(null, cols, state.rowState));

  for (let row = 0; row < rowsCount; row++) {
    const cells = new Array(colsCount)
        .fill('')
        .map(toCell(row, state))
        .join('');
    rows.push(createRow(row + 1, cells, state.rowState));
  }

  return rows.join('');
}
