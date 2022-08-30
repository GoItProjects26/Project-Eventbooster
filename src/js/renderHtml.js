import { Geohash } from './geo/hash';
import { refs } from './refs';
import { EventApi } from './api';
import { pag1 } from './pagination';
import { createPaginationOnLoad } from './pagination/pag';

const iconLocation = `
<defs>
<symbol 
        id="icon-location" viewBox="0 0 21 32"><path
        fill="#fff"
        style="fill:var(--color2, #fff)"
        d="M10.667 0C4.785 0 0 4.99 0 11.123 0 18.832 10.677 32 10.677 
        32s10.656-13.547 10.656-20.877C21.333 4.99 16.548 0 10.666 0zm3.218
         14.38c-.887.925-2.053 1.388-3.218 1.388s-2.331-.463-3.218-1.388c-1.775-1.85-1.775-4.861
          0-6.712.859-.896 2.002-1.39 3.218-1.39s2.359.494 3.218 1.39c1.775 1.851 1.775 4.861 0 6.712z"/>
       </symbol>
             </defs>`;
//master function

//render markup from server responce
export async function renderMarckup() {
  try {
    const responce = await EventApi.fetchApiData();
    const eventsArrayFull = responce._embedded?.events;
    const totalPagesFromServer = responce.page.totalPages;
    const totalPagesOnSite =
      totalPagesFromServer - 1 > 62 ? 62 : totalPagesFromServer - 1;
    pag1(responce);
    createPaginationOnLoad(totalPagesFromServer, totalPagesOnSite);
    if (!eventsArrayFull) {
      refs.eventList.innerHTML = `<h3 class="section_title">No any event found in your country</h3>`;
      return;
    }
    const eventsArray = shortDataFromServer(eventsArrayFull);
    marckup(eventsArray);
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
          <img
            src="${event.mobImg}"
            alt="${event.name}"
            width="120"
            height="151"
          />
        </div>
        <h3 class="event_title">${event.name}</h3>
        <p class="event_date">${event.localDate}</p>
        <p class="event_location location">
       <svg class="location_icon" width="6" height="9" xmlns="http://www.w3.org/2000/svg"><path d="M3 0C1.346 0 0 1.403 0 3.128 0 5.296 3.003 9 3.003 9S6 5.19 6 3.128C6 1.403 4.654 0 3 0Zm.905 4.044c-.25.26-.577.39-.905.39a1.25 1.25 0 0 1-.905-.39c-.5-.52-.5-1.367 0-1.887a1.246 1.246 0 0 1 1.81 0c.5.52.5 1.367 0 1.887Z"/></svg>
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
    mobImg: value.images[3].url,
    concertHall:
      value._embedded?.venues?.[0].name ??
      value._embedded?.venues?.[0].address.line1,
  };
}
