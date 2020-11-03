import {
  CHANGE_CELL,
  COL_RESIZE,
  TOOLBAR_CHANGE,
  CHANGE_CELL_STYLE,
} from './types';
import {ROW_RESIZE} from './types';

const colResize = (payload) => {
  return {type: COL_RESIZE, payload};
};
const rowResize = (payload) => {
  return {type: ROW_RESIZE, payload};
};
export const tableResize = (data) => {
  const payload = {};
  payload.id = data.id;
  payload.value = data.value;
  return data.type === 'col' ? colResize(payload) : rowResize(payload);
};
export const changeCell = (text, id) => {
  return {type: CHANGE_CELL, payload: {text, id}};
};
export const toolbarChange = (id) => {
  return {type: TOOLBAR_CHANGE, id};
};
export const changeCellsStyle = (value, ids) => {
  return {type: CHANGE_CELL_STYLE, payload: {value, ids}};
};
