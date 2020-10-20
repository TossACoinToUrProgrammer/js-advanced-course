class Dom {
  constructor(selector) {
    this.$el = typeof selector ==='string' ?
    document.querySelector(selector) :
    selector;
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

  getCoords() {
    return this.$el.getBoundingClientRect();
  }

  closest(selector) {
    return $(this.$el.closest(selector));
  }

  get data() {
    return this.$el.dataset;
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

  remove() {
    this.$el.remove();
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
