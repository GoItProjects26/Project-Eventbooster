import { Geohash } from './geo/hash';
import { refs } from './refs';
import { EventApi } from './api';
import { pag1 } from './pagination';
import { createPaginationOnLoad } from './pagination/pag';

const iconLocation = `
 <svg class="location_icon" width="6" height="9" xmlns="http://www.w3.org/2000/svg"><path d="M3 0C1.346 0 0 1.403 0 3.128 0 5.296 3.003 9 3.003 9S6 5.19 6 3.128C6 1.403 4.654 0 3 0Zm.905 4.044c-.25.26-.577.39-.905.39a1.25 1.25 0 0 1-.905-.39c-.5-.52-.5-1.367 0-1.887a1.246 1.246 0 0 1 1.81 0c.5.52.5 1.367 0 1.887Z"/></svg>`;
//master function
let preLoad = document.querySelector('.orbit-spinner');

//render markup from server responce
export async function renderMarckup() {
  try {
    preLoad.classList.remove('visually-hidden');
    const responce = await EventApi.fetchApiData();
    const eventsArrayFull = responce._embedded?.events;
    const totalPagesFromServer = responce.page.totalPages;
    const totalPagesOnSite =
      totalPagesFromServer - 1 > 62 ? 62 : totalPagesFromServer - 1;
    // createPaginationOnLoad(totalPagesFromServer, totalPagesOnSite);
    if (!eventsArrayFull) {
      preLoad.classList.add('visually-hidden');
      refs.eventList.innerHTML = `<h3 class="section_title">No any event found in your country</h3>`;
      refs.paginatedList.innerHTML = '';
      return;
    }
    const eventsArray = shortDataFromServer(eventsArrayFull);
    preLoad.classList.add('visually-hidden');

    marckup(eventsArray);

    // console.log(eventsArrayFull);
    // console.log('pages', totalPagesFromServer);
    pag1(totalPagesFromServer);
  } catch (error) {
    console.log(error);
  }
}
//render markup from local storage
export async function renderMarckupFromLocalStorage() {
  const localStorageData = localStorage.getItem('event');
  try {
    const eventsArrayFull = JSON.parse(localStorageData)._embedded?.events;
    if (!eventsArrayFull) {
      refs.eventList.innerHTML = `<h3 class="section_title">No any event found in your country</h3>`;
      return;
    }
    console.log('after');
    const eventsArray = shortDataFromServer(eventsArrayFull);
    marckup(eventsArray);
  } catch (error) {
    console.log(error);
  }
}

//slave functions
// create marckup for home page
function marckup(eventsArray) {
  const marckupArray = eventsArray.map(event => {
    return templateItems(event);
  });

  refs.eventList.innerHTML = marckupArray.join('');
}

// template for cards
function templateItems(event) {
  return `
   <li class="list_item" data-id ="${event.id}">
        <div class="event_img">
  <picture>
                    <source
                      media="(min-width: 1280px)"
                      srcset="
                        ${event.descImg1x} 1x,
                         ${event.descImg1x} 2x
                      "
                      type="image/jpg"
                    />

                    <source
                      media="(min-width: 768px)"
                      srcset="
                        ${event.tabImg1x} 1x,
                         ${event.tabImg2x} 2x
                      "
                      type="image/jpg"
                    />

                    <source
                      media="(max-width: 767px)"
                      srcset="
                        ${event.mobImg1x} 1x,
                         ${event.mobImg2x} 2x
                      "
                      type="image/jpg"
                    />

                     <img class="event__pic"
            src="${event.mobImg}"
            alt="${event.name}"
            width="120"
            height="151"
          />
                  </picture>
        </div>
        <h3 class="event_title">${event.name}</h3>
        <p class="event_date">${event.localDate}</p>
        <p class="event_location location">
      ${iconLocation}
        <span class="location_name">${event.concertHall}</span></p>
      </li>
`;
}
//sort out array of objects from server [{1,2,3},{1,2,3}.....] => [{1}]
function shortDataFromServer(eventsArrayFull) {
  const arrayOfDesiredObjcts = eventsArrayFull.map(value =>
    desiredObjectForPage(value)
  );
  return arrayOfDesiredObjcts;
}

//generate object with less key:value from incoming object
function desiredObjectForPage(value) {
  return {
    id: value.id,
    name: value.name,
    localDate: value.dates.start.localDate,

    mobImg1x: value.images
      .filter(img => (img.height > 151 ? img.width > 120 : false))
      .find(el => (el.height < 370 ? el.width < 400 : false)).url,
    mobImg2x: value.images
      .filter(img => (img.height > 151 ? img.width > 120 : false))
      .find(el => el.height < 365).url,

    tabImg1x: value.images
      .filter(img => (img.height > 674 ? img.width > 534 : false))
      .find(el => el.height < 1200).url,
    tabImg2x: value.images
      .filter(img => (img.height > 674 ? img.width > 534 : false))
      .find(el => el.height < 1200).url,

    descImg1x: value.images
      .filter(img => (img.height > 674 ? img.width > 534 : false))
      .find(el => el.height < 1200).url,
    descImg2x: value.images
      .filter(img => (img.height > 674 ? img.width > 534 : false))
      .find(el => el.height < 1200).url,
    concertHall:
      value._embedded?.venues?.[0].name ??
      value._embedded?.venues?.[0].address.line1,
  };
}
