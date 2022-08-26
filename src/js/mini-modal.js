import {refs}from "./refs"

refs.miniModalBtnClose.addEventListener("click", onClickMiniModalBtnClose);



function onClickMiniModalBtnClose (event) {
    refs.miniModal.classList.toggle("hidden")
}

refs.miniModalBtnCart.addEventListener("click", onClickMiniModalBtnOpenBasket);

function onClickMiniModalBtnOpenBasket (event) {
    refs.basketModal.classList.toggle("hidden")
}