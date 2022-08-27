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
  await renderModal(response);
  // await modalCloseBtn.addEventListener('click', closeModal);
}
const modalCloseBtn = document.querySelector('.modal__close-btn');

function renderModal(data) {
  openModal();

  // jsModal.insertAdjacentHTML(
  //   'beforeend',
  //   `
  //   <div class="modal__logo-box">
  //     <div class="modal__logo">small-logo-pic</div>
  //   </div>
  //   <div class="modal__container">
  //     <div class="modal__big-logo">BIG PIC</div>
  //     <ul class="modal__list list">
  //       <li class="modal__item">
  //         <p>INFO</p>
  //       </li>
  //       <li class="modal__item">
  //         <p>WHEN</p>
  //       </li>
  //       <li class="modal__item">
  //         <p>WHERE</p>
  //       </li>
  //       <li class="modal__item">
  //         <p>WHO</p>
  //       </li>
  //       <li class="modal__item">
  //         <p>PRICES</p>
  //       </li>
  //     </ul>
  //   </div>`
  // );
  jsModal.innerHTML = `
    <div class="modal__logo-box">
      <div class="modal__logo">small-logo-pic</div>
    </div>
    <div class="modal__data-container">
      <div class="modal__big-logo">BIG PIC</div>
      <ul class="modal__list list">
        <li class="modal__item">
          <p>INFO</p>
        </li>
        <li class="modal__item">
          <p>WHEN</p>
        </li>
        <li class="modal__item">
          <p>WHERE</p>
        </li>
        <li class="modal__item">
          <p>WHO</p>
        </li>
        <li class="modal__item">
          <p>PRICES</p>
        </li>
      </ul>
    </div>`;
  // const close = document.querySelector('modal__close-btn');
  // close.addEventListener('click', closeModal);
  // console.log(modalCloseBtn);
}
