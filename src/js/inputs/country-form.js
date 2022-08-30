import { refs } from '../refs';
import { EventApi } from '../api';
import { renderMarckup } from '../renderHtml';
import { countryCodes } from '../country/countryList';

refs.countryForm.addEventListener('change', onCountrySearch);

function onCountrySearch(event) {
  event.preventDefault();
  const countryName = refs.countryForm.elements.countryQuery.value;
  const countryObj = countryCodes.find(country => country.name === countryName);
  const countryCode = countryObj.code;
  EventApi.setCountry(countryCode);
  EventApi.setPage('0');
  renderMarckup();
}

