import {refs} from "./refs";
import userBasket from "./basket";

refs.miniModalBtnClose.addEventListener("click", onClickMiniModalBtnClose);

function onClickMiniModalBtnClose (event) {
    refs.miniModal.classList.toggle("hidden")
}

refs.miniModalBtnCart.addEventListener("click", onClickMiniModalBtnOpenBasket);

function onClickMiniModalBtnOpenBasket (event) {
    refs.miniModal.classList.toggle("hidden")
    //закрывает модалку//
    refs.basketModal.classList.toggle("hidden")
    refs.basketQuantity.textContent = userBasket.totalQuantity;
    renderBasketMarkup(data)/// Данные с именем события
}

function renderBasketMarkup (data) {
    let markup = "";
    data.forEach(({name}) => {
markup += `<li><div><div class="modal-basket__name">${name}</div></div></li>`
    })
    refs.basketMarkupContainer.insertAdjacentHTML("beforeend", markup);
}