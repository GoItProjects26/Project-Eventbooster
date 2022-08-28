import { countryCodes } from './countryList';
import { refs } from '../refs';

function sortedCountry() {
    const countryNames = countryCodes.map(country => Object.keys(country));
    const iso2Code = countryNames.flatMap(v => v);

    const countryName = countryCodes.map(country => Object.values(country))
    const countryNam = countryName.flatMap(v => v)
    const cccc = countryNam.map(v => Object.values(v)[0]);
    const ddd = cccc.map((el, i, arr) => ({ name: el, code: iso2Code[i] }))

    return ddd;
}

export function country() {
    refs.select.innerHTML = '<option value="${data.code}">${data.name}</option>'
    return refs.select.innerHTML = sortedCountry().map(data => countryTemplate(data)).join('');
}

function countryTemplate(data) {
    return `<option value="${data.code}">${data.name}</option>`
}
