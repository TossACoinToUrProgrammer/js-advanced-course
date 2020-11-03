import {
  CHANGE_CELL,
  CHANGE_CELL_STYLE,
  COL_RESIZE,
  ROW_RESIZE,
  TOOLBAR_CHANGE,
} from './types';

const initialState = {
  colState: {},
  rowState: {},
  cells: {},
  toolbarState: {},
};
/* eslint-disable no-case-declarations */
export const rootReducer = (state = initialState, action) => {
  let cells;
  switch (action.type) {
    case COL_RESIZE:
      const colState = state.colState || {};
      colState[action.payload.id] = action.payload.value;
      return {...state, colState};
    case ROW_RESIZE:
      const rowState = state.rowState || {};
      rowState[action.payload.id] = action.payload.value;
      return {...state, rowState};
    case CHANGE_CELL:
      cells = state.cells || {};
      cells[action.payload.id] ?
        cells[action.payload.id] : cells[action.payload.id] = {};
      cells[action.payload.id].text = action.payload.text;
      return {...state, cells};
    case CHANGE_CELL_STYLE:
      cells = state.cells || {};
      const {ids, value} = action.payload;
      Object.keys(value).forEach(key => {
        let style;
        if (cells[ids[0]].style[key] === value[key]) {
          style = 'unset';
        } else {
          style = value[key];
        }
        ids.forEach(id => {
          cells[id].style ? 0 : cells[id].style = {};
          cells[id].style[key] = style;
        });
      });
      return {...state, cells, toolbarState: cells[ids[0]].style};
    case TOOLBAR_CHANGE:
      const style = state.cells[action.id].style ?
      state.cells[action.id].style : {};
      return {...state, toolbarState: style};
    default:
      return state;
  }
};
