import {refs} from "./refs";
export {renderBasketMarkup}

function renderBasketMarkup(data) {
    const value = JSON.parse(localStorage.getItem("event"))
   
    refs.basketMarkupContainer.innerHTML = '';
    let markup = '';
    let url = data.images
    // .filter((item) => {
    //   item.ratio === "3_2"    })
      console.log(url)
    data.forEach(({name, url}) => {
      markup += `<li class="event__item"><div class="event__container"><img href="" class="event__img" width="30" height="30"><p class="event__text">${name}</p></div></li>`;
    });
    refs.basketMarkupContainer.insertAdjacentHTML('beforeend', markup);
  }