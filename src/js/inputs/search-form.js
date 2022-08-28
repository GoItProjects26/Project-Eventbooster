import { refs } from '../refs';
import { EventApi } from '../api';
import { renderMarckup } from '../renderHtml';

const eventApi = new EventApi();

refs.searchForm.addEventListener('submit', onEventSearch);

function onEventSearch(event) {
  event.preventDefault();
  const keyword = refs.searchForm.elements.searchQuery.value;

  if (keyword.trim() === '') {
    alert('Please enter an event name');
    return;
  }

  eventApi.setKeyword(keyword);
  renderMarckup();
}
