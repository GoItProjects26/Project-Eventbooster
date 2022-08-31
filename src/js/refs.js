export const refs = {
  //MAKS
  eventList: document.querySelector('.event_list '),
  paginatedList: document.querySelector('.paginated__list'),
  itemActive: document.querySelector('.item-active'),
  //================================================================================
  modalBuyBtn: document.querySelector('.js-buy-btn'),
  modalBackdrop: document.querySelector('.js-event-backdrop'),
  modalCloseBtn: document.querySelector('.modal__close-btn'),
  modalMoreBtn: document.querySelector('.modal__more-btn'),

  basketModal: document.querySelector('.modal-basket-backdrop'),
  basketQuantity: document.querySelector('.modal-basket__quantity'),
  basketHead: document.querySelector('[js-basket]'), //перед пушем поменять на класс
  basketContainerHead: document.querySelector('[js-basket-head]'),
  basketNumHead: document.querySelector('[js-basket-num-head]'),

  // basketVipBtn: document.querySelector("[js-vip]"),
  // basketStandardBtn: document.querySelector("[js-standard]"),
  basketContainer: document.querySelector('[js-basket-modal]'),
  basketNum: document.querySelector('[js-basket-num]'),
  basketMarkupContainer: document.querySelector('.modal-basket__name'),
  basketContinueBookingBtn: document.querySelector('.modal-basket__continue'),
  basketBuyBtn: document.querySelector('.modal-basket__buy'),
  basketClearBtn: document.querySelector('.modal-basket__clear'),
  basketBackdrop: document.querySelector('.modal-basket-backdrop'),
  basketTextEmpty: document.querySelector('.modal-basket__text--empty'),
  basketTextFull: document.querySelector('.modal-basket__text--full'),
  basketTextTicket: document.querySelector('.modal-basket__ticket'),
  basketTimerHeader: document.querySelector('.basket__timer--header'),
  basketTimer: document.querySelector('.basket__timer'),
  svgIcon: document.querySelector('.location__use'),

  miniModal: document.querySelector('.mini-modal-backdrop'),
  miniModalBtnCart: document.querySelector('.mini-modal__button'),
  miniModalBtnClose: document.querySelector('.mini-modal__close'),
  miniModalBackdrop: document.querySelector('.mini-modal-backdrop'),

  searchForm: document.querySelector('#search-form'),
  searchInput: document.querySelector('.search-form__input'),
  searchBtn: document.querySelector('.search-form__btn'),
  countryForm: document.querySelector('#country-form'),
  countryInput: document.querySelector('.country-form__input'),
  select: document.querySelector('.country-form__select'),
};
