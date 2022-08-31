// import { modalDataObj } from './getbyid';
import { refs } from './refs';
import {onClickModalBuyBtn} from "./mini-modal"

export function dataToCart(data) {
  let postData = data;
  refs.modalBuyBtn = document.querySelectorAll('.js-buy-btn');
  refs.modalBuyBtn.forEach(elem => {
    elem.addEventListener("click", () => {
      onClickModalBuyBtn(data);
    });

  });

}



// refs.modalBuyBtn.addEventListener("click", onClickModalBuyBtn);