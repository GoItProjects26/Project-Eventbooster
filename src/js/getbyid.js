import { refs } from './refs';
import { openModal } from './modal';
import { closeModal } from './modal';
import { dataToCart } from './addtocart';
import { EventApi } from './api';
import { renderMarckup } from './renderHtml';
import {
  renderModal,
  renderPrices,
  renderNoPrices,
} from './event-modal/render-evmodal';

let idForFetch = '';
const eventList = document.querySelector('.event_list');
eventList.addEventListener('click', onEventClick);
async function onEventClick(event) {
  let target = event.target;
  if (event.target.nodeName === 'UL') {
    return;
  }
  if (event.target.nodeName !== 'LI' && event.target.nodeName !== 'UL') {
    while (target.nodeName !== 'LI') {
      target = target.parentNode;
    }
  }
  idForFetch = target.dataset.id;

  let response = await EventApi.getById(idForFetch);

  renderModal(response);
  if (response.priceRanges) {
    renderPrices(response);
  } else {
    renderNoPrices();
  }
  openModal();
  dataToCart(response);
}

export function onLoadMoreClick() {
  const modalWho = document.querySelector('#modal__name').textContent;
  closeModal();
  EventApi.setKeyword(modalWho);
  EventApi.setCountry('');
  EventApi.setPage(0);
  renderMarckup();
}
