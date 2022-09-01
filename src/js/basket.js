import { refs } from "./refs";
export { userBasket, onClickBasketBackdrop, onEscKeyPressBasket, ESC_KEY_CODE, onBasketShow, updateBasket, addToLocalStorage }
import Basket from "./class_basket";
import { deleteTimer, timerDisplay } from './timer';
import { renderBasketMarkup } from "./basket_render";

const ESC_KEY_CODE = "Escape";


function setTimer(basketObj) {
    timerDisplay(basketObj)
    return timerId = setInterval(() => {
        timerDisplay(basketObj)
    }, basketObj.step);

}

refs.basketHead.addEventListener("click", onClickBasketHead);
function onClickBasketHead(event) {
    onBasketShow()
}

function onBasketShow() {

    document.body.classList.toggle("no-scroll");
    refs.basketModal.classList.toggle("hidden");
    refs.basketQuantity.textContent = userBasket.totalQuantity;
    refs.basketNum.textContent = userBasket.totalQuantity;


    renderBasketMarkup(userBasket.contentShoppingCart)/// Данные с именем события
    refs.basketBackdrop.addEventListener("click", onClickBasketBackdrop)
    window.addEventListener("keydown", onEscKeyPressBasket);
    if (!userBasket.isBasketEmpty) {
        if (refs.basketContainer.classList.contains("hidden")) refs.basketContainer.classList.remove("hidden");
        onBasketFull()
    } else { onBasketEmpty() }





}



function updateBasket() {
    setTimeout(() => {

        if (userBasket.totalQuantity === 0) {

            userBasket.isBasketEmpty = true;
            deleteTimer(timerId);
            onBasketEmpty();


            if (!refs.basketContainerHead.classList.contains("hidden")) refs.basketContainerHead.classList.add("hidden")
            disabledElement(refs.basketBuyBtn);
            disabledElement(refs.basketClearBtn);


        } else {
            renderBasketMarkup(userBasket.contentShoppingCart)/// Данные с именем события
            refs.basketQuantity.textContent = userBasket.totalQuantity;
            refs.basketNum.textContent = userBasket.totalQuantity;
            refs.basketNumHead.textContent = userBasket.totalQuantity
            if (refs.basketContainerHead.classList.contains("hidden")) refs.basketContainerHead.classList.remove("hidden")
        }
    }, 6)

}

function onBasketEmpty() {
    disabledElement(refs.basketBuyBtn);
    disabledElement(refs.basketClearBtn);
    refs.basketTextFull.classList.add("hidden");
    refs.basketTextEmpty.classList.remove("hidden");
    refs.basketQuantity.innerHTML = ""
    refs.basketNumHead.innerHTML = "";
    refs.basketMarkupContainer.innerHTML = "";
    deleteLocalStorage();
    if (!refs.basketContainer.classList.contains("hidden")) {
        refs.basketContainer.classList.add("hidden");
    }
    if (!refs.basketContainerHead.classList.contains("hidden")) {
        refs.basketContainerHead.classList.add("hidden");
    }
}

function deleteLocalStorage() {
    localStorage.removeItem("userBasket");
}



function onBasketFull() {
    anabledElement(refs.basketBuyBtn);
    anabledElement(refs.basketClearBtn);
    refs.basketTextFull.classList.remove("hidden");
    refs.basketTextEmpty.classList.add("hidden");

    userBasket.totalQuantity != 1 ? refs.basketTextTicket.textContent = "tickets" : refs.basketTextTicket.textContent = "ticket";
    setTimer(userBasket)

}

function anabledElement(element) {
    element.disabled = false;
    element.style.color = "#4c00fe";
    element.style.borderColor = "#4c00fe";
}

function disabledElement(element) {
    element.disabled = true;
    element.style.color = "grey";
    element.style.borderColor = "grey";
}



function onClickBasketBackdrop(event) {
    if (event.currentTarget === event.target) {
        onBasketClose()
    }
}

function onEscKeyPressBasket(event) {
    if (event.code === ESC_KEY_CODE) {
        onBasketClose()
    }
}




let userBasket = {};
loadPage()
function localStorageCheck() {
    if (!localStorage.getItem("userBasket")) return userBasket = new Basket; //должно создаваться при загрузке Фетча
    const oldUserBasket = (JSON.parse(localStorage.getItem("userBasket")))
    userBasket = new Basket;

    if (oldUserBasket.contentShoppingCart[oldUserBasket.contentShoppingCart.length - 1]?.timer < Date.now() - userBasket.duration) return userBasket = new Basket
    return Object.assign(userBasket, oldUserBasket)

}

function loadPage() {
    localStorageCheck();

    if (userBasket.contentShoppingCart[userBasket.contentShoppingCart.length - 1]?.timer > Date.now() - userBasket.duration) setTimer(userBasket)
    if (!userBasket.isBasketEmpty && refs.basketContainerHead.classList.contains("hidden")) {
        refs.basketContainerHead.classList.remove("hidden")
        refs.basketNumHead.textContent = userBasket.totalQuantity;

    }

    if (userBasket.isBasketEmpty && !refs.basketContainerHead.classList.contains("hidden")) {
        refs.basketContainerHead.classList.add("hidden")
        refs.basketNumHead.textContent = userBasket.totalQuantity;

    }

    refs.basketQuantity.textContent = userBasket.totalQuantity
    refs.basketNum.textContent = userBasket.totalQuantity
    if (userBasket.totalQuantity === 0 && !refs.basketNum.classList.contains("hidden")) refs.basketNum.classList.add("hidden")
}









refs.basketContinueBookingBtn.addEventListener("click", onClickBasketContinueShoppingBtn);
function onClickBasketContinueShoppingBtn(event) {
    if (!userBasket.isBasketEmpty && refs.basketContainerHead.classList.contains("hidden")) refs.basketContainerHead.classList.remove("hidden")
    if (userBasket.isBasketEmpty && !refs.basketContainerHead.classList.contains("hidden")) refs.basketContainerHead.classList.add("hidden")
    addToLocalStorage(userBasket);
    refs.basketNumHead.textContent = userBasket.totalQuantity;
    onBasketClose()
}

function addToLocalStorage(obj) {
    localStorage.setItem("userBasket", JSON.stringify(obj));
}

function onBasketClose() {
    refs.basketBackdrop.removeEventListener("click", onClickBasketBackdrop)
    window.removeEventListener("keydown", onEscKeyPressBasket);
    refs.basketModal.classList.toggle("hidden")
    document.body.classList.toggle("no-scroll");
}


refs.basketBuyBtn.addEventListener("click", onClickBuyBtn)
function onClickBuyBtn(event) {
    userBasket.contentShoppingCart.forEach(id => {
        clearTimeout(id)
    })
    window.open("https://next.privat24.ua/", '_blank')
    onBasketClose()

}

refs.basketClearBtn.addEventListener("click", onClickClearBtn)
function onClickClearBtn(event) {
    if (!refs.basketContainer.classList.contains("hidden")) refs.basketContainer.classList.add("hidden")
    if (!refs.basketContainerHead.classList.contains("hidden")) refs.basketContainerHead.classList.add("hidden")
    userBasket.clearList()
    refs.basketQuantity.innerHTML = userBasket.totalQuantity
    refs.basketNumHead.innerHTML = userBasket.totalQuantity
    refs.basketMarkupContainer.innerHTML = "";
    deleteLocalStorage();
    userBasket.isBasketEmpty = true;
    onBasketEmpty();
    deleteTimer(timerId)

}


export function clearAfterSignOut() {
    userBasket.clearList()
    refs.basketQuantity.innerHTML = userBasket.totalQuantity
    refs.basketNumHead.innerHTML = userBasket.totalQuantity
    refs.basketMarkupContainer.innerHTML = "";
    deleteLocalStorage();
    userBasket.isBasketEmpty = true;
    if (!refs.basketContainerHead.classList.contains("hidden")) refs.basketContainerHead.classList.add("hidden")
    if (!refs.basketContainer.classList.contains("hidden")) refs.basketContainer.classList.add("hidden")
    onBasketEmpty();
    // deleteTimer(timerId)
}


refs.basketMarkupContainer.addEventListener("click", onClickDeleteButton);
function onClickDeleteButton(event) {
    if (event.target.closest(".close__box") === null) return;

    event.target.closest("LI").dataset.id

    for (let i = 0; i <= userBasket.contentShoppingCart.length - 1; i += 1) {
        if (userBasket.contentShoppingCart[i].id === event.target.closest("LI").dataset.id) {
            userBasket.contentShoppingCart.splice(i, 1)
            userBasket.decreaseStandardQuantity()
            break;
        }
    }
    updateBasket()
}