// import { modalDataObj } from './getbyid';
import { refs } from './refs';
import {onClickModalBuyBtn} from "./mini-modal"

export function dataToCart(data) {
  refs.modalBuyBtn = document.querySelectorAll('.js-buy-btn');
  refs.modalBuyBtn.forEach(elem => {
    elem.addEventListener("click", onClickModalBuyBtn);
    
  });
}


// refs.modalBuyBtn.addEventListener("click", onClickModalBuyBtn);