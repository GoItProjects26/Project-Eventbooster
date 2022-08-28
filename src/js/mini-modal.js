
import {refs} from "./refs";
import {userBasket} from "./basket";
import userEventApi from "./api"
import {closeModal} from "./modal"





// refs.modalBuyBtn.addEventListener("click", onClickModalBuyBtn);
// function onClickModalBuyBtn (event) {
//     refs.miniModal.classList.toggle("hidden");
 
//     const basketId = event.target.closest("[data-id]").dataset.id
//     console.log(userBasket.contentShoppingCart)
//     userBasket.addEvent(basketId)
//     console.log(userBasket.contentShoppingCart)
//     userBasket.increaseStandardQuantity ()
//     localStorage.setItem("userBasket", JSON.stringify(userBasket));


// }


refs.miniModalBtnClose.addEventListener("click", onClickMiniModalBtnClose);
function onClickMiniModalBtnClose (event) {
    refs.miniModal.classList.toggle("hidden")
    localStorage.setItem("userBasket", JSON.stringify(userBasket));
}

refs.miniModalBtnCart.addEventListener("click", onClickMiniModalBtnOpenBasket);
function onClickMiniModalBtnOpenBasket (event) {
    refs.miniModal.classList.toggle("hidden")
    closeModal();
    refs.basketModal.classList.toggle("hidden")
    refs.basketQuantity.textContent = userBasket.totalQuantity;
    refs.basketNum.textContent = userBasket.totalQuantity;
    if (userBasket.totalQuantity !== 0 && refs.basketNum.classList.contains("hidden")) refs.basketContainer.classList.remove("hidden")
    localStorage.setItem("userBasket", JSON.stringify(userBasket));
    renderBasketMarkup(userBasket.contentShoppingCart)/// Данные с именем события
}


function renderBasketMarkup (data) {
    refs.basketMarkupContainer.innerHTML = "";
    let markup = "";
    data.forEach(name => {
    markup += `<li><div><div class="modal-basket__name">${name}</div></div></li>`
    })
    refs.basketMarkupContainer.insertAdjacentHTML("beforeend", markup);
 
}







