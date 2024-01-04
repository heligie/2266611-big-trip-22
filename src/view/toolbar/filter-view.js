import AbstractView from '../../framework/view/abstract-view.js';

const createFilterTemplate = (filter, isChecked) => {
  const {type, count} = filter;

  return `<div class="trip-filters__filter">
            <input id="filter-${type}" class="trip-filters__filter-input visually-hidden" type="radio" name="trip-filter" value="${type}"
            ${isChecked ? 'checked' : ''} ${count === 0 ? 'disabled' : ''}>
            <label class="trip-filters__filter-label" for="filter-${type}">${type}</label>
          </div>`;
};

const createFiltersTemplate = (filters) => {
  const filtersTemplate = filters.map((filter, index) => createFilterTemplate(filter, index === 0)).join('');

  return `<form class="trip-filters" action="#" method="get">
            ${filtersTemplate}
            <button class="visually-hidden" type="submit">Accept filter</button>
          </form>`;
};

export default class FilterView extends AbstractView {
  #filters = null;

  constructor ({filters}) {
    super();
    this.#filters = filters;
  }

  get template() {
    return createFiltersTemplate(this.#filters);
  }
}
