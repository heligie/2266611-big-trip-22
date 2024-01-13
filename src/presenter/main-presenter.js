import {render} from '../framework/render.js';
import {sortByValue} from '../utils/utils.js';
import {SortType, UserAction, UpdateType} from '../utils/const.js';
import {sortByDate, sortByDuration} from '../utils/date.js';

import SortView from '../view/toolbar/sort-view.js';
import ListView from '../view/content/list-view.js';
import StubView from '../view/stubs/stub-view.js';
import PointPresenter from './point-presenter.js';

const contentContainer = document.querySelector('.trip-events');

export default class MainPresenter {
  #pointModel = null;

  #pointPresenters = new Map();

  #sortComponent = null;
  #listComponent = new ListView();
  #stubComponent = new StubView();

  #defaultSortType = SortType.DAY;
  #currentSortType = this.#defaultSortType;

  constructor({pointModel}) {
    this.#pointModel = pointModel;

    this.#pointModel.addObserver(this.#handleModelEvent);
  }

  get points() {
    switch (this.#currentSortType) {
      case 'day':
        return [...this.#pointModel.points].sort(sortByDate('dateFrom'));
      case 'time':
        return [...this.#pointModel.points].sort(sortByDuration('dateFrom', 'dateTo'));
      case 'price':
        return [...this.#pointModel.points].sort(sortByValue('basePrice'));
    }
    return this.#pointModel.points.sort(sortByDate('dateFrom'));
  }

  get offers() {
    return this.#pointModel.offers;
  }

  get destinations() {
    return this.#pointModel.destinations;
  }

  init() {
    this.#renderWithoutContent();
    this.#renderContent();
  }

  // Контент
  // -----------------

  #renderWithoutContent = () => {
    if (this.points.length === 0) {
      render(this.#stubComponent, contentContainer);
    }
  };

  #renderContent = () => {
    this.#renderSortTypes();

    this.#renderContainer();
    this.#renderPoints();
  };

  #clearContent = ({resetSortType = false} = {}) => {
    this.#pointPresenters.forEach((presenter) => presenter.destroy());
    this.#pointPresenters.clear();

    if (resetSortType) {
      this.#currentSortType = SortType.DAY;
    }
  };

  // Сортировка
  // -----------------

  #renderSortTypes = () => {
    const currentSortType = this.#currentSortType;
    const onSortTypeChange = this.#handleSortTypeChange;

    this.#sortComponent = new SortView({currentSortType, onSortTypeChange});

    render(this.#sortComponent, contentContainer);
  };

  #handleSortTypeChange = (sortType) => {
    this.#currentSortType = sortType;
    this.#clearContent();
    this.#renderPoints();
  };

  // Точки
  // -----------------

  #renderContainer = () => {
    render(this.#listComponent, contentContainer);
  };

  #renderPoints = () => {
    this.points.forEach((point) => this.#renderPoint(point, this.offers, this.destinations));
  };

  #renderPoint = (point, offers, destinations) => {
    const listComponent = this.#listComponent.element;
    const onDataChange = this.#handleViewAction;
    const onModeChange = this.#handleModeChange;

    const pointPresenter = new PointPresenter({listComponent, onDataChange, onModeChange});

    pointPresenter.init(point, offers, destinations);
    this.#pointPresenters.set(point.id, pointPresenter);
  };

  // Обработчики
  // -----------------

  #handleViewAction = (actionType, updateType, update) => {
    switch (actionType) {
      case UserAction.UPDATE_POINT:
        this.#pointModel.updatePoint(updateType, update);
        break;
      case UserAction.ADD_POINT:
        this.#pointModel.addPoint(updateType, update);
        break;
      case UserAction.DELETE_POINT:
        this.#pointModel.deletePoint(updateType, update);
        break;
    }
  };

  #handleModelEvent = (updateType, updatePoint) => {
    switch (updateType) {
      case UpdateType.PATCH:
        this.#pointPresenters.get(updatePoint.id).init(updatePoint, this.offers, this.destinations);
        break;
      case UpdateType.MINOR:
        this.#clearContent();
        this.#renderPoints();
        break;
      case UpdateType.MAJOR:
        this.#clearContent({resetSortType: true});
        this.#renderPoints();
        break;
    }
  };

  #handleModeChange = () => {
    this.#pointPresenters.forEach((presenter) => presenter.resetView());
  };
}
