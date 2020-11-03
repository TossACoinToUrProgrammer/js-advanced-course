class Dom {
  constructor(selector) {
    this.$el = typeof selector ==='string' ?
    document.querySelector(selector) :
    selector;
  }
  toHtml() {
    const $container = document.createElement('div');
    $container.append(this.$el);
    return $container.innerHTML;
  }
  html(html='') {
    if (typeof html ==='string') {
      this.$el.innerHTML = html;
      return this;
    } else {
      return this.$el.outerHTML.trim();
    }
  }

  clear() {
    this.html('');
    return this;
  }

  append(node) {
    if (node instanceof Dom) {
      node = node.$el;
    }
    if (Element.prototype.append) {
      this.$el.append(node);
    } else {
      this.$el.appendChild(node);
    }
    return this;
  }
  hasClass(selector) {
    return this.$el.classList.contains(selector);
  }
  getCoords() {
    return this.$el.getBoundingClientRect();
  }

  closest(selector) {
    return $(this.$el.closest(selector));
  }

  get data() {
    return this.$el.dataset;
  }
  find(selector) {
    return $(this.$el.querySelector(selector));
  }
  findAll(selector) {
    return this.$el.querySelectorAll(selector);
  }

  css(style = {}) {
    Object.keys(style).forEach(key => this.$el.style[key] = style[key]);
  }

  on(eventType, func) {
    return this.$el.addEventListener(eventType, func);
  }

  off(eventType, func) {
    this.$el.removeEventListener(eventType, func);
  }
  id(parse) {
    if (parse) {
      const parsed = this.id().split(':');
      return {
        row: +parsed[0],
        col: +parsed[1],
      };
    }
    return this.data.id;
  }
  text(text) {
    let key = 'textContent';
    if (this.$el.tagName === 'Input') key = 'value';
    if (typeof text === 'string') {
      this.$el[key] = text;
    }
    return this.$el[key].trim();
  }
  focus() {
    const range = document.createRange();
    const sel = window.getSelection();

    range.setStart(this.$el, 1);
    range.collapse(true);

    sel.removeAllRanges();
    sel.addRange(range);

    this.$el.focus();
    this.$el.scrollIntoView({block: 'nearest', inline: 'nearest'});
    return this;
  }
  remove() {
    this.$el.remove();
  }
  addClass(className) {
    this.$el.classList.add(className);
  }
  removeClass(className) {
    this.$el.classList.remove(className);
  }
  insert(pos = 'beforeend', html = '') {
    this.$el.insertAdjacentHTML(pos, html);
  }
}

export function $(selector) {
  return new Dom(selector);
}

$.create=( tagName, classList='' )=>{
  const element = document.createElement(tagName);
  classList && element.classList.add(classList);

  return $(element);
};
