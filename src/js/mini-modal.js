import {refs} from "./refs";
import {userBasket, ESC_KEY_CODE, onBasketShow, addToLocalStorage} from "./basket";
import {closeModal} from "./modal"
export {onClickModalBuyBtn}

    function onClickModalBuyBtn(data) {
        refs.miniModal.classList.toggle("hidden");
        userBasket.addEvent(data);
        userBasket.increaseStandardQuantity()
        addToLocalStorage(userBasket);
        refs.miniModalBackdrop.addEventListener("click", onClickMiniModalBackdrop);
        window.addEventListener("keydown", onEscKeyPressMiniModal);
        refs.basketContainerHead.classList.remove("hidden")
        refs.basketNumHead.textContent = userBasket.totalQuantity;
        userBasket.isBasketEmpty = false;
}

function onEscKeyPressMiniModal (event) {
    if(event.code === ESC_KEY_CODE) {
        window.removeEventListener("keydown", onEscKeyPressMiniModal);
        refs.miniModalBackdrop.removeEventListener("click", onClickMiniModalBackdrop)
        refs.miniModal.classList.toggle("hidden")
    }
}
function onClickMiniModalBackdrop (event) {
    if(event.currentTarget === event.target) {
        window.removeEventListener("keydown", onEscKeyPressMiniModal);
        refs.miniModalBackdrop.removeEventListener("click", onClickMiniModalBackdrop)
        refs.miniModal.classList.toggle("hidden")
    }
}

refs.miniModalBtnClose.addEventListener("click", onClickMiniModalBtnClose);
function onClickMiniModalBtnClose (event) {
    refs.miniModal.classList.toggle("hidden")
    localStorage.setItem("userBasket", JSON.stringify(userBasket));
    window.removeEventListener("keydown", onEscKeyPressMiniModal);
    refs.miniModalBackdrop.removeEventListener("click", onClickMiniModalBackdrop)
}

refs.miniModalBtnCart.addEventListener("click", onClickMiniModalBtnOpenBasket);
function onClickMiniModalBtnOpenBasket (event) {
    refs.miniModal.classList.toggle("hidden")
    closeModal();
    localStorage.setItem("userBasket", JSON.stringify(userBasket));
    refs.miniModalBackdrop.removeEventListener("click", onClickMiniModalBackdrop)
    window.removeEventListener("keydown", onEscKeyPressMiniModal);
    onBasketShow()
}



