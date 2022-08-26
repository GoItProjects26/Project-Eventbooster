import { refs } from './refs';
import { EventApi } from './api'

const event = new EventApi;


export async function renderMarckup() {
    try {
        const responce = await event.fetchApiData();
        const eventsArrayFull = responce._embedded.events;
        const eventsArray = shortDataFromServer(eventsArrayFull);
        marckup(eventsArray);
    } catch (error) {
        console.log(error);
    }
}


function marckup(eventsArray) {
    const marckupArray = eventsArray.map(event => {
        return templateItems(event)
    })

    refs.eventList.innerHTML = marckupArray.join('')
}


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
        <p class="event_location">${event.concertHall}</p>
      </li>
`
}

function shortDataFromServer(eventsArrayFull) {
    const arrayOfDesiredObjcts = eventsArrayFull.map(value => desiredObjectForPage(value))
    return arrayOfDesiredObjcts;
}


function desiredObjectForPage(value) {
    return {
        id: value.id,
        name: value.name,
        localDate: value.dates.start.localDate,
        mobImg: value.images[3].url,
        concertHall: value._embedded.venues?.[0].name,
    }
}

function loadRandomEvent() {

}
