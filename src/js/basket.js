import {refs} from "./refs";
export {userBasket, onClickBasketBackdrop, onEscKeyPressBasket, ESC_KEY_CODE, onBasketShow, updateBasket}
import Basket from "./class_basket";
import {deleteTimer, setTimer} from './timer';
import {renderBasketMarkup} from "./basket_render";

const ESC_KEY_CODE = "Escape";

refs.basketHead.addEventListener("click", onClickBasketHead);
function onClickBasketHead (event) {
    onBasketShow()
}

function onBasketShow() {
    
    refs.basketModal.classList.toggle("hidden");
    refs.basketQuantity.textContent = userBasket.totalQuantity;
    refs.basketNum.textContent = userBasket.totalQuantity;
    
   
    renderBasketMarkup(userBasket.contentShoppingCart)/// Данные с именем события
    refs.basketBackdrop.addEventListener("click", onClickBasketBackdrop)
    window.addEventListener("keydown", onEscKeyPressBasket);
    if (!userBasket.isBasketEmpty) {
        refs.basketContainer.classList.toggle("hidden");
        onBasketFull()
    }   else {onBasketEmpty()}
}



function updateBasket () {
    setTimeout (() =>{
        if (userBasket.totalQuantity === 0) {
            if (!refs.basketContainer.classList.contains("hidden")) {
                refs.basketContainer.classList.add("hidden");
            }
            userBasket.isBasketEmpty = true;
            deleteTimer(timerId);
            onBasketEmpty();
            
            refs.basketQuantity.innerHTML = userBasket.totalQuantity
            refs.basketNumHead.innerHTML = userBasket.totalQuantity
            refs.basketMarkupContainer.innerHTML = "";
            localStorage.removeItem("userBasket");
            if (!refs.basketContainerHead.classList.contains("hidden")) refs.basketContainerHead.classList.add("hidden")
            disabledElement(refs.basketBuyBtn);
            disabledElement(refs.basketClearBtn);
            refs.basketTimer.textContent = "";
            
        } else {
            renderBasketMarkup(userBasket.contentShoppingCart)/// Данные с именем события
            refs.basketQuantity.textContent = userBasket.totalQuantity;
            refs.basketNum.textContent = userBasket.totalQuantity;
            refs.basketNumHead.textContent = userBasket.totalQuantity
            if (refs.basketContainerHead.classList.contains("hidden")) refs.basketContainerHead.classList.remove("hidden")
        }
    },6)

}

function onBasketEmpty() {
    disabledElement(refs.basketBuyBtn);
    disabledElement(refs.basketClearBtn);
    refs.basketTextFull.classList.add("hidden");
    refs.basketTextEmpty.classList.remove("hidden");
    refs.basketTimer.innerHTML = "";
    refs.basketTimerHeader.innerHTML = "";
    refs.basketTimer.textContent = "";
    



}



function onBasketFull () {
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

function disabledElement (element) {
    element.disabled = true;
    element.style.color = "grey";
    element.style.borderColor = "grey";
}



function onClickBasketBackdrop(event) {
    if(event.currentTarget === event.target) {
        onBasketClose()
    }
}

function onEscKeyPressBasket (event) {
        if(event.code === ESC_KEY_CODE) {
            onBasketClose()
    }
}




let userBasket = {};
function firstLoadPage () {
    if (!localStorage.getItem("userBasket")) return userBasket = new Basket; //должно создаваться при загрузке Фетча
    const oldUserBasket = (JSON.parse(localStorage.getItem("userBasket")))
    userBasket = new Basket;
    return Object.assign(userBasket, oldUserBasket)

}

firstLoadPage()

if (!userBasket.isBasketEmpty && refs.basketContainerHead.classList.contains("hidden")) {
    refs.basketContainerHead.classList.remove("hidden")
    refs.basketNumHead.textContent = userBasket.totalQuantity;
    
}

refs.basketQuantity.textContent = userBasket.totalQuantity
refs.basketNum.textContent = userBasket.totalQuantity
if (userBasket.totalQuantity === 0 && !refs.basketNum.classList.contains("hidden")) refs.basketNum.classList.add("hidden")



refs.basketContinueBookingBtn.addEventListener("click", onClickBasketContinueShoppingBtn);
function onClickBasketContinueShoppingBtn (event) {
    if (!userBasket.isBasketEmpty && refs.basketContainerHead.classList.contains("hidden")) refs.basketContainerHead.classList.remove("hidden")
    if (userBasket.isBasketEmpty && !refs.basketContainerHead.classList.contains("hidden")) refs.basketContainerHead.classList.add("hidden")
    localStorage.setItem("userBasket", JSON.stringify(userBasket));
    refs.basketNumHead.textContent = userBasket.totalQuantity;
    onBasketClose()
}

function onBasketClose() {
    refs.basketBackdrop.removeEventListener("click", onClickBasketBackdrop)
    window.removeEventListener("keydown", onEscKeyPressBasket);
    refs.basketModal.classList.toggle("hidden")
    refs.basketTimer.textContent = "";
}


refs.basketBuyBtn.addEventListener("click", onClickBuyBtn)
function onClickBuyBtn (event) {
    userBasket.contentShoppingCart.forEach(id => {
        clearTimeout(id)
    } )
    window.open("https://next.privat24.ua/", '_blank')
    onBasketClose()

}

refs.basketClearBtn.addEventListener("click", onClickClearBtn)
function onClickClearBtn(event) {
    if(!refs.basketContainer.classList.contains("hidden")) refs.basketContainer.classList.add("hidden")
    if(!refs.basketContainerHead.classList.contains("hidden")) refs.basketContainerHead.classList.add("hidden")
    userBasket.clearList()
    refs.basketQuantity.innerHTML = userBasket.totalQuantity
    refs.basketNumHead.innerHTML = userBasket.totalQuantity
    refs.basketMarkupContainer.innerHTML = "";
    localStorage.removeItem("userBasket");
    userBasket.isBasketEmpty = true;
    onBasketEmpty();
    deleteTimer(timerId)
    

}



function onClickStandardBuyBtn (event) {
    this.addEvent()
    this.increaseStandardQuantity()
    refs.miniModal.classList.toggle("hidden")
    //добавить закрытие модалки//
}

function onClickVipBuyBtn (event) {
    this.addEvent()
    this.increaseVipQuantity()
    refs.miniModal.classList.toggle("hidden")
     //добавить закрытие модалки//
}

