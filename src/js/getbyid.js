import { refs } from './refs';
import { fetchApiData } from './api';
import { openModal } from './modal';
import { closeModal } from './modal';
import { dataToCart } from './addtocart';
import ticketIcon from '../images/ticket1.svg';
import { EventApi } from './api';
import { renderMarckup } from './renderHtml';
import { selectPicturesForModal } from './event-modal/img-select';
const axios = require('axios').default;

let axiosConfig = {
  baseURL: 'https://app.ticketmaster.com/discovery/v2/events',
  params: {
    apikey: '5HiPtCjBuAY9gthoMA0oQuJCLkmuGiMG',
    // apikey: '6iAtgNGAR43W6F7x79CI9WmegarTMZK1',
  },
};
let idForFetch = '';
async function getById(id) {
  const resp = await axios.get(`/${id}.json`, axiosConfig);
  return resp.data;
}

const eventList = document.querySelector('.event_list');
eventList.addEventListener('click', onEventClick);
async function onEventClick(event) {
  // console.log('target', event.target);
  let target = event.target;
  if (event.target.nodeName === 'UL') {
    return;
  }
  if (event.target.nodeName !== 'LI' && event.target.nodeName !== 'UL') {
    // console.log(target.parentNode);
    while (target.nodeName !== 'LI') {
      target = target.parentNode;
      // console.log(target);
    }
  }
  // console.log('target', target);
  idForFetch = target.dataset.id;

  // console.log(idForFetch);
  let response = await getById(idForFetch);
  // console.log(response);
  renderModal(response);
  if (response.priceRanges) {
    renderPrices(response);
  } else {
    renderNoPrices();
  }
  openModal();
  dataToCart(response);
}

function renderModal(data) {
  let imgArray = selectPicturesForModal(data);
  let timeString = '';
  if (data.dates.start.localTime) {
    timeString = data.dates.start.localTime.slice(0, 5);
  }
  const dateObj = {
    date: data.dates.start.localDate,
    time: timeString,
    timezone: data.dates.timezone,
  };
  const dateString = Object.values(dateObj).join(', ');
  // console.log(dateString);
  let infoString;
  if (data.info) {
    infoString = data.info;
  } else {
    infoString = 'No additional info avaliable.';
  }

  refs.jsModal.innerHTML = `
        <div class="modal__logo"><img
            src="${imgArray[1].url}"
            alt=""
          /></div>
      <div class="modal__data-container">
        <div class="modal__big-logo">   
         <img  
            src="${imgArray[0].url}"
            alt=""
          /></div>
        <ul class="modal__list list">
          <li class="modal__item">
            <h3 class="modal__title">INFO</h3>
            <p class="modal__text">${infoString}</p>
          </li>
          <li class="modal__item">
            <h3 class="modal__title">WHEN</h3>
            <p class="modal__text">${dateString}</p>
          </li>
          <li class="modal__item">
            <h3 class="modal__title">WHERE</h3>
            <p class="modal__text">${data._embedded.venues[0].name}</p>
          </li>
          <li class="modal__item">
            <h3 class="modal__title">WHO</h3>
            <p class="modal__text" id="modal__name">${data.name}</p>
          </li>
          <li class="modal__item">
            <h3 class="modal__title">PRICES</h3>
            <div class="modal__prices" data-id="${data.id}"></div>
          </li>
        </ul>
      </div>`;
}

import ticketIcon from '../images/ticket1.svg';

function renderPrices(data) {
  const pricesElem = document.querySelector('.modal__prices');
  let pricesMarkup = data.priceRanges
    .map(
      (elem, index) => `
      <div class="prices__box">
<img class="prices__icon" src="${ticketIcon}" alt="Ticket icon" />
        <p class="modal__text prices__text">
          ${elem.type} ${elem.min} - ${elem.max} ${elem.currency}
        </p>
      </div>
      <button type="button" class="prices__btn js-buy-btn center" data-index="${index}">
        <p class="prices__btn-txt">ADD TO CART</p>
      </button>
      <a href="${data.url}" target="_blank" rel="noopener noreferrer"><button type="button" class="prices__btn center">
        <p class="prices__btn-txt">BUY TICKET</p>
      </button></a>
  `
    )
    .join('');
  pricesElem.innerHTML = pricesMarkup;
}
function renderNoPrices() {
  const pricesElem = document.querySelector('.modal__prices');
  pricesElem.innerHTML = `
      <div class="prices__box">
        <p class="modal__text prices__text">
          No tickets avaliable at this moment.
        </p>
      </div>`;
}
export function onLoadMoreClick() {
  const modalWho = document.querySelector('#modal__name').textContent;
  closeModal();
  EventApi.setKeyword(modalWho);
  EventApi.setCountry('');
  EventApi.setPage(0);
  renderMarckup();
}
