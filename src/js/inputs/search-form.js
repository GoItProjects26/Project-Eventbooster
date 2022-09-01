import { refs } from '../refs';
import { EventApi } from '../api';
import { renderMarckup } from '../renderHtml';
import { getLatLong } from '../geo/geoApi';

refs.searchForm.addEventListener('submit', onEventSearch);
refs.searchForm.addEventListener('dblclick', onSearchFormReset);

function onEventSearch(event) {
  event.preventDefault();
  getLatLong();
  const keyword = refs.searchForm.elements.searchQuery.value;

  EventApi.setKeyword(keyword);
  renderMarckup();
}

function onSearchFormReset() {
  refs.searchForm.elements.searchQuery.value = '';
  EventApi.setKeyword('');
}
