import { Geohash } from './geo/hash';
import { refs } from './refs';
import { EventApi } from './api'

//master function
const event = new EventApi;
//render markup from server responce 
export async function renderMarckup() {
    try {
        const responce = await event.fetchApiData();
        // console.log(responce);
        const eventsArrayFull = responce._embedded.events;
        const eventsArray = shortDataFromServer(eventsArrayFull);
        marckup(eventsArray);
    } catch (error) {
        console.log(error);
    }
}
//render markup from local storage
export async function renderMarckupFromLocalStorage() {
    const localStorageData = localStorage.getItem("event");
    try {
        const eventsArrayFull = JSON.parse(localStorageData)._embedded.events;
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
        return templateItems(event)
    })

    refs.eventList.innerHTML = marckupArray.join('')
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
        <svg  class="location_icon" width = "6" height = "9">
        <use href="icons.adfc4680.svg#icon-location"></use>
        </svg>
        <span class="location_name">${event.concertHall}</span></p>
      </li>
`
}
//sort out array of objects from server [{1,2,3},{1,2,3}.....] => [{1}]
function shortDataFromServer(eventsArrayFull) {
    const arrayOfDesiredObjcts = eventsArrayFull.map(value => desiredObjectForPage(value))
    return arrayOfDesiredObjcts;
}

//generate object with less key:value from incoming object 
function desiredObjectForPage(value) {
    return {
        id: value.id,
        name: value.name,
        localDate: value.dates.start.localDate,
        mobImg: value.images[3].url,
        concertHall: value._embedded.venues?.[0].name,
    }
}
//will be logic for 1st time visit our site
function loadRandomEvent() {

}

// navigator.geolocation.getCurrentPosition((Position) => {

//     console.log(Position.coords.latitude, Position.coords.longitude)
// });
