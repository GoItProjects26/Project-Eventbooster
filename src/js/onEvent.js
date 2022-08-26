import { refs } from './refs';
import { renderMarckup } from './renderHtml'

console.log(refs.fetchBtn);

refs.fetchBtn.addEventListener('click', renderMarckup);
window.addEventListener("load", loadRandomEvent);