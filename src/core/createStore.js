export const createStore = (rootReducer, initialState = {}) => {
  let state = rootReducer({...initialState}, {type: '__INIT__'});
  let listeners = [];

  return {
    subscribe(fn) {
      listeners.push(fn);
      return {
        unsubscribe() {
          listeners = listeners.filter(item => item !== fn);
        },
      };
    },
    dispatch(action) {
      state = rootReducer(state, action);
      listeners.forEach(item => item(state));
    },
    getState() {
      return JSON.parse(JSON.stringify(state));
    },
  };
};
