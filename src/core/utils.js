export function capitalize(str) {
  if (typeof str !== 'string') return '';
  return 'on' + str[0].toUpperCase() + str.slice(1);
}
export function storage(key, data) {
  if (!data) {
    return JSON.parse(localStorage.getItem(key));
  }
  localStorage.setItem(key, JSON.stringify(data));
}
export function isEqual(a, b) {
  return JSON.stringify(a) === JSON.stringify(b);
}
