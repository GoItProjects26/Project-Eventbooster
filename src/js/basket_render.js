import {refs} from "./refs";
export {renderBasketMarkup}

function renderBasketMarkup(data) {
    const value = JSON.parse(localStorage.getItem("event"))
   
    refs.basketMarkupContainer.innerHTML = '';
    let markup = '';

    data.forEach(({name, images}) => {
      
      
      markup += `<li class="event__item"><div class="event__container"><img src=${smallestPhoto(images)} class="event__img"><p class="event__text">${name}</p></div></li>`;
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