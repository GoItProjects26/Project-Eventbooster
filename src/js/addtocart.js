// import { modalDataObj } from './getbyid';
import { refs } from './refs';
import { onClickModalBuyBtn } from "./mini-modal"
import { writeNewPost } from './geo/log'
export function dataToCart(data) {
  let postData = data;
  refs.modalBuyBtn = document.querySelectorAll('.js-buy-btn');
  refs.modalBuyBtn.forEach(elem => {
    elem.addEventListener("click", () => {
      onClickModalBuyBtn(data);

      writeNewPost(data);

    });

  });

}



// refs.modalBuyBtn.addEventListener("click", onClickModalBuyBtn);