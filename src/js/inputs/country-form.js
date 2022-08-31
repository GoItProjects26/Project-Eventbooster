import { refs } from '../refs';
import { EventApi } from '../api';
import { renderMarckup } from '../renderHtml';
import { countryCodes } from '../country/countryList';

refs.countryForm.addEventListener('change', onCountrySearch);
refs.countryInput.addEventListener('mouseenter', onCountryFormReset);

function onCountrySearch(event) {
  event.preventDefault();
  const countryName = refs.countryForm.elements.countryQuery.value;
  const countryObj = countryCodes.find(country => country.name === countryName);
  let countryCode = countryObj.code;

  if (countryCode === 'XX') {
    countryCode = '';
  }

  EventApi.setCountry(countryCode);
  EventApi.setPage('0');
  renderMarckup();
}

function onCountryFormReset() {
  refs.countryForm.elements.countryQuery.value = '';
  EventApi.setCountry('');
}
