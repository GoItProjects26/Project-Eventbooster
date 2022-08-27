export const refs = {
    fetchBtn: document.querySelector(".btn"),
    eventList: document.querySelector('.event_list '),

    basketModal: document.querySelector(".modal-basket-backdrop"),
    basketQuantity: document.querySelector(".modal-basket__quantity"),

    basketVipBtn: document.querySelector("[js-vip]"),
    basketStandardBtn: document.querySelector("[js-standard]"),
    basketNum: document.querySelector(".basket__num"),
    basketMarkupContainer: document.querySelector(".modal-basket__name"),
    basketContinueBookingBtn: document.querySelector(".modal-basket__continue"),
    basketBuyBtn: document.querySelector(".modal-basket__buy"),
    basketClearBtn: document.querySelector(".modal-basket__clear"),


    miniModal: document.querySelector(".mini-modal-backdrop"),
    miniModalBtnCart: document.querySelector(".mini-modal__button"),
    miniModalBtnClose: document.querySelector(".mini-modal__close"),


    select: document.querySelector('.country-form__select'),
}

console.log(refs.select);