import { refs } from '../refs';
import { EventApi } from '../api';
import { renderMarckup } from '../renderHtml';

refs.countryForm.addEventListener('change', onCountrySearch);

function onCountrySearch(event) {
  const country = refs.countryForm.elements.countrySelect.value;
  EventApi.setCountry(country);
  renderMarckup();
}
