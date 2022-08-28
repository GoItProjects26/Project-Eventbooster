import { refs } from '../refs';
import { EventApi } from '../api';

const eventApi = new EventApi();

refs.searchForm.addEventListener('submit', onEventSearch);
refs.countryForm.addEventListener('submit', onCountrySearch);

function onEventSearch(event) {
  event.preventDefault();
  const keyword = refs.searchForm.elements.searchQuery.value;
  eventApi.setKeyword(keyword);
  eventApi.fetchApiData();

  if (keyword === '') {
    alert('Please enter an event name');
    return;
  }

  fetchEvents();
}
