import { refs } from '../refs';
import { EventApi } from '../api';
import { renderMarckup } from '../renderHtml';

const eventApi = new EventApi();

refs.countryForm.addEventListener('change', onCountrySearch);

function onCountrySearch(event) {
  const country = refs.countryForm.elements.countrySelect.value;

  eventApi.setCountry(country);
  refs.countryInput.value = country;
  renderMarckup();
}
