import {$} from '@/core/dom';
import {Emitter} from '../../core/Emitter';
import {StoreSubscrber} from '../../core/StoreSubscriber';
import {TableSelection} from '../table/TableSelection';

export class Excel {
  constructor(selector, options) {
    this.$el = $(selector);
    this.components = options.components || [];
    this.store = options.store;
    this.emitter = new Emitter();
    this.selection = new TableSelection();
    this.subscriber = new StoreSubscrber(this.store);
  }

  getRoot() {
    const $root = $.create('div', 'excel');

    this.components = this.components.map(Component => {
      const $el = $.create('div', Component.className);
      const component = new Component($el, {
        emitter: this.emitter,
        store: this.store,
        selection: this.selection,
      });
      $el.html(component.toHtml());
      $root.append($el);
      return component;
    });

    return $root;
  }

  render() {
    this.$el.append(this.getRoot());
    this.subscriber.subscribeComponents(this.components);
    this.components.forEach(component => component.init());
  }
  destroy() {
    this.subscriber.unsubscribeFromStore();
    this.components.forEach(item => item.destroy());
  }
}
