import {refs} from "./refs";
export {renderBasketMarkup}

function renderBasketMarkup(data) {
    const value = JSON.parse(localStorage.getItem("event"))
   
    refs.basketMarkupContainer.innerHTML = '';
    let markup = '';
    data.forEach(({name}) => {
      markup += `<li><div><div class="modal-basket__name">${name}</div></div></li>`;
    });
    refs.basketMarkupContainer.insertAdjacentHTML('beforeend', markup);
  }