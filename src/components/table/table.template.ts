interface CODES {
  A:number
  Z:number
}
const CODES: CODES = {
  A: 65,
  Z: 90,
};

function toCell(row:number) {
  return (_: any, col: number):string => {
    return `
      <div class="cell" data-row='${row}' data-id='${row+':'+col}' data-col='${col}' contenteditable></div>
    `;
  }
}

function toColumn(col: string, index: number): string {
  return `
    <div class="column" data-col='${index}' data-type="resizable">${col}<div class='col-resize' data-resize='col'></div></div>
  `;
}

function createRow(index: number, content: string): string {
  return `
    <div class="row" data-type="resizable">
      <div class="row-info">${index ? index + "<div class='row-resize' data-resize='row'></div>" : ''}</div>
      <div class="row-data">${content}</div>
    </div>
  `;
}

function toChar(_: any, index: number): string {
  return String.fromCharCode(CODES.A + index);
}

export function createTable(rowsCount: number = 15): string {
  const colsCount = CODES.Z - CODES.A + 1;
  const rows = [];

  const cols = new Array(colsCount)
      .fill('')
      .map(toChar)
      .map(toColumn)
      .join('');

  rows.push(createRow(null, cols));

  for (let row = 0; row < rowsCount; row++) {
    const cells = new Array(colsCount)
        .fill('')
        .map(toCell(row))
        .join('');

    rows.push(createRow(row + 1, cells));
  }

  return rows.join('');
}
