import {DomListener} from '@core/DomListener';

export class ExcelComponent extends DomListener {
  constructor($root, options = {}) {
    super($root, options.listeners);
    this.prepare();
    this.emitter = options.emitter;
    this.store = options.store;
    this.subscribe = options.subscribe || [];
    this.selection = options.selection;
    this.unsubscribers = [];
  }
  prepare() {}
  // Возвращает шаблон компонента
  toHtml() {
    return '';
  }
  $emit(event, ...args) {
    this.emitter.emit(event, ...args);
  }
  $on(event, fn) {
    const unsub = this.emitter.subscribe(event, fn);
    this.unsubscribers.push(unsub);
  }
  $dispatch(action) {
    this.store.dispatch(action);
  }
  storeChanged() {
  }
  init() {
    this.initDOMListeners();
  }

  destroy() {
    this.removeDOMListeners();
    this.unsubscribers.forEach(item=>item());
  }
}
