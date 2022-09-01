import ticketIcon from '../../images/ticket1.svg';
import { selectPicturesForModal } from '../event-modal/img-select';
import { refs } from '../refs';

export function renderModal(data) {
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

export function renderPrices(data) {
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
export function renderNoPrices() {
  const pricesElem = document.querySelector('.modal__prices');
  pricesElem.innerHTML = `
      <div class="prices__box">
        <p class="modal__text prices__text">
          No tickets avaliable at this moment.
        </p>
      </div>`;
}
