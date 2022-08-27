import { refs } from './refs';
import { fetchApiData } from './api';
const axios = require('axios').default;

// TEST
// async function fefe() {
//   const reqRes = await fetchApiData();
//   console.log(reqRes);
// }
// fefe();

let axiosConfig = {
  baseURL: 'https://app.ticketmaster.com/discovery/v2/events',
  params: {
    apikey: '5HiPtCjBuAY9gthoMA0oQuJCLkmuGiMG',
  },
};
let idForFetch = '';
async function getById(id) {
  const resp = await axios.get(`/${id}.json`, axiosConfig);
  console.log(resp.data);
}
// getById(idForFetch);

const eventList = document.querySelector('.event_list');
eventList.addEventListener('click', onEventClick);
function onEventClick(event) {
  //   console.log(444);
  //   console.log(event.target);
  if (event.target.nodeName === 'LI') {
    console.log(event.target.dataset.id);
    idForFetch = event.target.dataset.id;
  } else if (event.target.nodeName === 'H3' || event.target.nodeName === 'P') {
    console.log(event.target.parentNode.dataset.id);
    idForFetch = event.target.parentNode.dataset.id;
  } else if (event.target.nodeName === 'IMG') {
    console.log(event.target.parentNode.parentNode.dataset.id);
    idForFetch = event.target.parentNode.parentNode.dataset.id;
  }
  getById(idForFetch);
}
