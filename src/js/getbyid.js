import { refs } from './refs';
import { fetchApiData } from './api';
import { openModal } from './modal';
import { closeModal } from './modal';
import ticketIcon from '../images/ticket1.svg';

const axios = require('axios').default;
const jsModal = document.querySelector('.modal__container');
// TEST
// async function fefe() {
//   const reqRes = await fetchApiData();
//   console.log(reqRes);
// }
// fefe();

let axiosConfig = {
  baseURL: 'https://app.ticketmaster.com/discovery/v2/events',
  params: {
    apikey: '5HiPtCjBuAY9gthoMA0oQuJCLkmuGiMG',
  },
};
let idForFetch = '';
async function getById(id) {
  const resp = await axios.get(`/${id}.json`, axiosConfig);
  // console.log(resp.data);
  return resp.data;
}
// getById(idForFetch);

const eventList = document.querySelector('.event_list');
eventList.addEventListener('click', onEventClick);
async function onEventClick(event) {
  if (event.target.nodeName === 'LI') {
    idForFetch = event.target.dataset.id;
  } else if (event.target.nodeName === 'H3' || event.target.nodeName === 'P') {
    idForFetch = event.target.parentNode.dataset.id;
  } else if (event.target.nodeName === 'IMG') {
    idForFetch = event.target.parentNode.parentNode.dataset.id;
  }
  let response = await getById(idForFetch);
  console.log(response);
  // console.log(date(response.dates.start.dateTime));
  await renderModal(response);
  await renderPrices(response.priceRanges);
  // await renderPrices(arr);
}

function renderModal(data) {
  openModal();

  jsModal.innerHTML = `
      <div class="modal__logo-box">
        <div class="modal__logo">small-logo-pic</div>
      </div>
      <div class="modal__data-container">
        <div class="modal__big-logo">BIG PIC</div>
        <ul class="modal__list list">
          <li class="modal__item">
            <h3 class="modal__title">INFO</h3>
            <p>${data.info}</p>
          </li>
          <li class="modal__item">
            <h3 class="modal__title">WHEN</h3>
            <p>${data.dates.start.datetime}</p>
          </li>
          <li class="modal__item">
            <h3 class="modal__title">WHERE</h3>
            <p>${data._embedded.venues[0].name}</p>
          </li>
          <li class="modal__item">
            <h3 class="modal__title">WHO</h3>
            <p>${data.name}</p>
          </li>
          <li class="modal__item">
            <h3 class="modal__title">PRICES</h3>
            <div id="modal__prices" data-id=${data.id}></div>
          </li>
        </ul>
      </div>`;
}

function renderPrices(data) {
  // console.log(data);
  const pricesElem = document.querySelector('#modal__prices');
  let pricesMarkup = data
    .map(
      elem => `
      <div class="prices__box">
       <img
          class="prices__icon"
          src="${ticketIcon}"
          alt="Кот"
          width="60"
        />
        <p class="prices__text">
          ${elem.type} ${elem.min} - ${elem.max} ${elem.currency}
        </p>
      </div>
  `
    )
    .join('');
  pricesElem.innerHTML = pricesMarkup;
}

// test arr
// const arr = [
//   { currency: 'USD', max: 1250, min: 15, type: 'standard' },
//   { currency: 'USD', max: 1555, min: 16, type: 'standard' },
// ];
//  <img src="./images/event_bg_mb_1x.png" width="50"/>
