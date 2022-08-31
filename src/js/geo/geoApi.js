import { EventApi } from '../api';
import { countryCodes } from '../country/countryList';
import { renderMarckup } from '../renderHtml';
import Geohash from './hash';
import { refs } from '../refs';

export async function findCountryByIp() {
  const response = await fetch('http://ip-api.com/json/?fields=country');
  const data = await response.json();
  const country = data.country.toUpperCase();
  const code = countryCodes.find(el => el.name === country).code;
  EventApi.setCountry(code);
  refs.countryForm.elements.countryQuery.value = country;
  renderMarckup();
  return;
}

export function getLatLong() {
  navigator.geolocation.getCurrentPosition(Position => {
    console.log(Position.coords.latitude, Position.coords.longitude);
    const hash = Geohash.encode(
      Position.coords.latitude,
      Position.coords.longitude,
      5
    );
    console.log(hash);
    EventApi.setGeoPoint(hash);
  });
}

/*
const key = "ee726807a49066d3b79a480bc3cd828d";
const END_POINT = "http://api.positionstack.com/v1/";



function name(params) {
    return fetch('http://api.positionstack.com/v1/reverse?access_key=ee726807a49066d3b79a480bc3cd828d&query=46.3077376,30.6151424')
        .then(data => data.json())
        .then(data => data)
}
*/
