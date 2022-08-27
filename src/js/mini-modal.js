
import {refs} from "./refs";
import {Basket} from "./basket";
import userEventApi from "./api"
import {closeModal} from "./modal"
const userBasket = new Basket; //должно создаваться при загрузке Фетча


// // refs.modalBuyBtn.addEventListener("click", onClickModalBuyBtn);
// // function onClickModalBuyBtn (event) {
// //     refs.miniModal.classList.toggle("hidden");
 
// //     const basketId = event.target.closest("[data-id]").dataset.id
// //     userBasket.addEvent(basketId)
// //     userBasket.increaseStandardQuantity ()
// // }


// refs.miniModalBtnClose.addEventListener("click", onClickMiniModalBtnClose);

// function onClickMiniModalBtnClose (event) {
//     refs.miniModal.classList.toggle("hidden")
// }

// refs.miniModalBtnCart.addEventListener("click", onClickMiniModalBtnOpenBasket);

// function onClickMiniModalBtnOpenBasket (event) {
//     refs.miniModal.classList.toggle("hidden")
//     closeModal();
//     refs.basketModal.classList.toggle("hidden")
//     refs.basketQuantity.textContent = userBasket.totalQuantity;
//     refs.basketNum.textContent = userBasket.totalQuantity;
//     if (userBasket.totalQuantity !== 0 && refs.basketNum.classList.contains("hidden")) refs.basketContainer.classList.remove("hidden")
//     localStorage.setItem("userBasket", JSON.stringify(userBasket));
//     renderBasketMarkup(userBasket.contentShoppingCart)/// Данные с именем события
// }

// function renderBasketMarkup (data) {
//     let markup = "";
//     data.forEach(name => {
// markup += `<li><div><div class="modal-basket__name">${name}</div></div></li>`
//     })
//     refs.basketMarkupContainer.insertAdjacentHTML("beforeend", markup);
// }