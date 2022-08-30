import {refs} from "./refs";
export {renderBasketMarkup}

function renderBasketMarkup(data) {
    const value = JSON.parse(localStorage.getItem("event"))
   
    refs.basketMarkupContainer.innerHTML = '';
    let markup = '';

    data.forEach(({name, images, _embedded: {venues}}) => {
      let path = "./images/icons.svg#icon-location";
      let {city: {name: nameCity}, country: {name: nameCountry}} = venues[0];
       markup += `<li class="event__item"><div class="event__container"><img src=${smallestPhoto(images)} class="event__img"><div><p class="event__text">${name}</p><div class="location__container"><svg class="location__svg" width="20" height="20"><use class="location__use" href=${path}></use></svg><p class="location__text">${nameCity}, ${nameCountry}</p></div></div></li>`;
    
      });
    refs.basketMarkupContainer.insertAdjacentHTML('beforeend', markup);
  }

  function smallestPhoto(array) {
    let arr = array.filter((array) => {
      if (array.ratio === "3_2") return true; 
      return false
      }).sort((a, b) => {
        if (a.width > b.width) return 1;
        return -1
      })
      return arr[0].url
    }

// refs.svgIcon.setAttribute("href", "./images/icons.svg#icon-location");
