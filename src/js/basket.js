import {refs} from "./refs";
export {userBasket, onClickBasketBackdrop, onEscKeyPressBasket, ESC_KEY_CODE, onBasketShow, updateBasket}
import Basket from "./class_basket";
import {deleteTimer, setTimer} from './timer';

const ESC_KEY_CODE = "Escape";





// refs.basketVipBtn.addEventListener("click", onClickVipBtn);
// refs.basketVipBtn.addEventListener("click", onClickStandardBtn);


function onClickVipBtn (event) {

}

refs.basketHead.addEventListener("click", onClickBasketHead);
function onClickBasketHead (event) {
    onBasketShow()
}

function onBasketShow() {
    // if (passedTime <= 500) userBasket.contentShoppingCart.shift()
    
    // let {minutes, seconds} = calculateTime(userBasket)

    
    refs.basketModal.classList.toggle("hidden");
    refs.basketQuantity.textContent = userBasket.totalQuantity;
    refs.basketNum.textContent = userBasket.totalQuantity;
   
   
    renderBasketMarkup(userBasket.contentShoppingCart)/// Данные с именем события
    refs.basketBackdrop.addEventListener("click", onClickBasketBackdrop)
    window.addEventListener("keydown", onEscKeyPressBasket);
    
    if (!userBasket.isBasketEmpty && refs.basketContainer.classList.contains("hidden")) {
        refs.basketContainer.classList.remove("hidden");
        onBasketFull()
    }
    
    // if (userBasket.isBasketEmpty) refs.basketTimer.innerHTML = `${minutes} : ${seconds}`
       
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
            
        } else {
            renderBasketMarkup(userBasket.contentShoppingCart)/// Данные с именем события
            refs.basketQuantity.textContent = userBasket.totalQuantity;
            refs.basketNum.textContent = userBasket.totalQuantity;
            refs.basketNumHead.textContent = userBasket.totalQuantity
            if (refs.basketContainerHead.classList.contains("hidden")) refs.basketContainerHead.classList.remove("hidden")
        }
    },6)

}

function onBasketFull () {
    console.log("tut")
    refs.basketTextFull.classList.remove("hidden");
    refs.basketTextEmpty.classList.add("hidden");
    userBasket.totalQuantity != 1 ? refs.basketTextTicket.textContent = "tickets" : refs.basketTextTicket.textContent = "ticket";
    setTimer(userBasket)
    
}

function renderBasketMarkup(data) {
    const value = JSON.parse(localStorage.getItem("event"))
   
    refs.basketMarkupContainer.innerHTML = '';
    let markup = '';
    data.forEach(({name}) => {
      markup += `<li><div><div class="modal-basket__name">${name}</div></div></li>`;
    });
    refs.basketMarkupContainer.insertAdjacentHTML('beforeend', markup);
  }

function onClickBasketBackdrop(event) {
    if(event.currentTarget === event.target) {
        refs.basketModal.classList.toggle("hidden")
        refs.basketBackdrop.removeEventListener("click", onClickBasketBackdrop)
        refs.basketBackdrop.removeEventListener("click", onClickBasketBackdrop)
    }
}

function onEscKeyPressBasket (event) {
        if(event.code === ESC_KEY_CODE) {
            window.removeEventListener("keydown", onEscKeyPressBasket);
            refs.basketBackdrop.removeEventListener("click", onClickBasketBackdrop)
            refs.basketModal.classList.toggle("hidden");
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
//     updateSecondLoad()
// function updateSecondLoad () {

// }
refs.basketQuantity.textContent = userBasket.totalQuantity
refs.basketNum.textContent = userBasket.totalQuantity
if (userBasket.totalQuantity === 0 && !refs.basketNum.classList.contains("hidden")) refs.basketNum.classList.add("hidden")



refs.basketContinueBookingBtn.addEventListener("click", onClickBasketContinueShoppingBtn);
function onClickBasketContinueShoppingBtn (event) {
    refs.basketModal.classList.toggle("hidden")
    if (!userBasket.isBasketEmpty && refs.basketContainerHead.classList.contains("hidden")) refs.basketContainerHead.classList.remove("hidden")
    if (userBasket.isBasketEmpty && !refs.basketContainerHead.classList.contains("hidden")) refs.basketContainerHead.classList.add("hidden")
    localStorage.setItem("userBasket", JSON.stringify(userBasket));
    refs.basketNumHead.textContent = userBasket.totalQuantity;
    refs.basketBackdrop.removeEventListener("click", onClickBasketBackdrop)
    window.removeEventListener("keydown", onEscKeyPressBasket);
}


refs.basketBuyBtn.addEventListener("click", onClickBuyBtn)
function onClickBuyBtn (event) {
    userBasket.contentShoppingCart.forEach(id => {
        clearTimeout(id)
    } )
    alert("вы купили милион билетов")
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
function onBasketEmpty() {
    refs.basketTextFull.classList.add("hidden");
    refs.basketTextEmpty.classList.remove("hidden");
    refs.basketTimer.innerHTML = ""

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

