import { refs } from './refs';
import { fetchApiData, EventApi } from './api'

const event = new EventApi;


export function renderMarckup() {
    event.fetchApiData()
        .then(data => data._embedded.events)
        .then(eventsArrayFull => shortDataFromServer(eventsArrayFull))
        .then(eventsArray => marckup(eventsArray))
        .then(data => console.log(data, '1111111'))
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


        localTime: value.dates.start.localTime,
        ticketType: value.priceRanges?.[0].type,
        priceCurrency: value.priceRanges?.[0].currency,
        priceMin: value.priceRanges?.[0].min,
        priceMax: value.priceRanges?.[0].max,
        locationAddress: value._embedded.venues?.[0].address.line1,
        locationCity: value._embedded.venues?.[0].city.name,
        locationCountry: value._embedded.venues?.[0].country.name,
    }
}

function loadRandomEvent() {

}

/*

 return {
                id: event.id,
                name: event.name,
                localDate: event.dates.start.localDate,
                localTime: event.dates.start.localTime,
                ticketType: event.priceRanges?.[0].type,

                priceCurrency: event.priceRanges?.[0].currency,
                priceMin: event.priceRanges?.[0].min,
                priceMax: event.priceRanges?.[0].max,
                locationAddress: event._embedded.venues?.[0].address.line1,
                locationCity: event._embedded.venues?.[0].city.name,
                locationCountry: event._embedded.venues?.[0].country.name,
                concertHall: event._embedded.venues?.[0].name,
            }
*/