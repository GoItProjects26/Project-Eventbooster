import { refs } from './refs';
import { renderMarckup } from './renderHtml'
import { country } from "./country/dropDown"

refs.fetchBtn.addEventListener('click', renderMarckup);
window.addEventListener("load", country);