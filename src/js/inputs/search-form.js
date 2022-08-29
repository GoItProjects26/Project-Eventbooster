import { refs } from '../refs';
import { EventApi } from '../api';
import { renderMarckup } from '../renderHtml';

refs.searchForm.addEventListener('submit', onEventSearch);

function onEventSearch(event) {
  event.preventDefault();
  const keyword = refs.searchForm.elements.searchQuery.value;

  if (keyword.trim() === '') {
    alert('Please enter an event name');
    return;
  }

  EventApi.setKeyword(keyword);
  renderMarckup();
}
