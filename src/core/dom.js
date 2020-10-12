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

  on(eventType, func) {
    return this.$el.addEventListener(eventType, func);
  }

  off(eventType, func) {
    this.$el.removeEventListener(eventType, func);
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
