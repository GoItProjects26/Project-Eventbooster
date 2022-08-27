import { refs } from './refs';
import { fetchApiData } from './api';
import { openModal } from './modal';
import { closeModal } from './modal';

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
  //   console.log(444);
  //   console.log(event.target);
  if (event.target.nodeName === 'LI') {
    console.log(event.target.dataset.id);
    idForFetch = event.target.dataset.id;
  } else if (event.target.nodeName === 'H3' || event.target.nodeName === 'P') {
    console.log(event.target.parentNode.dataset.id);
    idForFetch = event.target.parentNode.dataset.id;
  } else if (event.target.nodeName === 'IMG') {
    console.log(event.target.parentNode.parentNode.dataset.id);
    idForFetch = event.target.parentNode.parentNode.dataset.id;
  }
  let response = await getById(idForFetch);
  console.log(response);
  console.log(response._embedded.venues[0].name);
  await renderModal(response);
  // await modalCloseBtn.addEventListener('click', closeModal);
}
// const modalCloseBtn = document.querySelector('.modal__close-btn');

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
            <div id="modal__prices"></div>
          </li>
        </ul>
      </div>`;
}
