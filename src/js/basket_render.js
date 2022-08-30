import {refs} from "./refs";
export {renderBasketMarkup}

function renderBasketMarkup(data) {
    const value = JSON.parse(localStorage.getItem("event"))
   
    refs.basketMarkupContainer.innerHTML = '';
    let markup = '';

    data.forEach(({name, images, _embedded: {venues}}) => {
      let path = "./images/icons.svg#icon-location";
      let {city: {name: nameCity}, country: {name: nameCountry}} = venues[0];
       markup += `<li class="event__item"><div class="event__container"><img src=${smallestPhoto(images)} class="event__img"><div class="event__thumb"><p class="event__text">${name}</p><div class="location__container">
       <svg class="location_icon" width="6" height="9" xmlns="http://www.w3.org/2000/svg"><path d="M3 0C1.346 0 0 1.403 0 3.128 0 5.296 3.003 9 3.003 9S6 5.19 6 3.128C6 1.403 4.654 0 3 0Zm.905 4.044c-.25.26-.577.39-.905.39a1.25 1.25 0 0 1-.905-.39c-.5-.52-.5-1.367 0-1.887a1.246 1.246 0 0 1 1.81 0c.5.52.5 1.367 0 1.887Z"/></svg>
       <p class="location__text">${nameCity}, ${nameCountry}</p></div></div></li>`;
    
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


const iconLocation = `
<defs>
<symbol 
        id="icon-location" viewBox="0 0 21 32"><path
        fill="#fff"
        style="fill:var(--color2, #fff)"
        d="M10.667 0C4.785 0 0 4.99 0 11.123 0 18.832 10.677 32 10.677 
        32s10.656-13.547 10.656-20.877C21.333 4.99 16.548 0 10.666 0zm3.218
         14.38c-.887.925-2.053 1.388-3.218 1.388s-2.331-.463-3.218-1.388c-1.775-1.85-1.775-4.861
          0-6.712.859-.896 2.002-1.39 3.218-1.39s2.359.494 3.218 1.39c1.775 1.851 1.775 4.861 0 6.712z"/>
       </symbol>
             </defs>`;