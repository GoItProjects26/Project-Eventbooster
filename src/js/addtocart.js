// import { modalDataObj } from './getbyid';
import notiflix from 'notiflix'
import { refs } from './refs';
import { onClickModalBuyBtn } from "./mini-modal"
import { writeNewPost } from './geo/log'
import { auth } from './geo/log'
export function dataToCart(data) {
  let postData = data;
  refs.modalBuyBtn = document.querySelectorAll('.js-buy-btn');
  refs.modalBuyBtn.forEach(elem => {
    elem.addEventListener("click", () => {
      if (!auth.currentUser) {
        notiflix.Notify.warning("This option only for registered users! Please register!")
        return
      }
      onClickModalBuyBtn(data);

      writeNewPost(data);

    });

  });

}



// refs.modalBuyBtn.addEventListener("click", onClickModalBuyBtn);