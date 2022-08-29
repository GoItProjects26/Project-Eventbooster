import { countryCodes } from './countryList';
import { refs } from '../refs';


export function country() {
    refs.select.innerHTML = '<option value="${data.code}">${data.name}</option>'
    return refs.select.innerHTML = countryCodes.map(data => countryTemplate(data)).join('');
}

function countryTemplate(data) {
    return `<option data-value="${data.code}">${data.name}</option>`
}
