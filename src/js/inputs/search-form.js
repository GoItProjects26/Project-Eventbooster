import { refs } from '../refs';
import { EventApi } from '../api';
import { renderMarckup } from '../renderHtml';
import { getLatLong } from '../geo/geoApi'

refs.searchForm.addEventListener('submit', onEventSearch);

function onEventSearch(event) {
  event.preventDefault();
  getLatLong();
  const keyword = refs.searchForm.elements.searchQuery.value;

  if (keyword.trim() === '') {
    alert('Please enter an event name');
    return;
  }

  EventApi.setKeyword(keyword);
  renderMarckup();
}
