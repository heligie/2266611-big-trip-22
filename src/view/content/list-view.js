import {createElement} from '../../render';

const createListTemplate = () => '<ul class="trip-events__list"></ul>';

export default class ListView {
  getTemplate() {
    return createListTemplate();
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }
    return this.element;
  }
}
