// import { modalDataObj } from './getbyid';
import { refs } from './refs';

export function dataToCart(data) {
  refs.modalBuyBtn = document.querySelectorAll('.js-buy-btn');
  refs.modalBuyBtn.forEach(elem => {
    elem.addEventListener('click', () => {
      console.log('индекс из датасета -', elem.dataset.index);
    });
  });
}
