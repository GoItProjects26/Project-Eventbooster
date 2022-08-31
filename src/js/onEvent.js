import { refs } from './refs';
import { renderMarckup, renderMarckupFromLocalStorage } from './renderHtml';
import { country } from './country/dropDown';
import { saveCollectionToLocalStorage } from './load/load';
import { findCountryByIp } from './geo/geoApi';

//MAKS
window.addEventListener('load', country);
window.addEventListener('load', saveCollectionToLocalStorage);
// setTimeout(renderMarckup, 5000);
window.addEventListener('load', renderMarckup);
// window.addEventListener('load', findCountryByIp);
//================================================================================
