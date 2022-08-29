import {refs} from "./refs";
export {userBasket, onClickBasketBackdrop, onEscKeyPressBasket, ESC_KEY_CODE, onBasketShow}
import userEventApi from "./api"

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
    refs.basketModal.classList.toggle("hidden");
    refs.basketQuantity.textContent = userBasket.totalQuantity;
    refs.basketNum.textContent = userBasket.totalQuantity;
   
    renderBasketMarkup(userBasket.contentShoppingCart)/// Данные с именем события
    refs.basketBackdrop.addEventListener("click", onClickBasketBackdrop)
    window.addEventListener("keydown", onEscKeyPressBasket);
    
    if (userBasket.totalQuantity !== 0 && refs.basketContainer.classList.contains("hidden")) {
        refs.basketContainer.classList.remove("hidden");
        onBasketFull()
    }
    userBasket.totalQuantity != 1 ? refs.basketTextTicket.textContent = "tickets" : refs.basketTextTicket.textContent = "ticket";
}

function onBasketFull () {
    refs.basketTextFull.classList.remove("hidden");
    refs.basketTextEmpty.classList.add("hidden");
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


class Basket {
    constructor () {
        this.contentShoppingCart = [];
        this.vipQuantity = 0;
        this.standardQuantity = 0;
        this.totalQuantity = 0;
        this.duration = 900000;
        this.step = 1000;
    }


    increaseVipQuantity () {
        this.vipQuantity += 1
        this.totalQuantity += 1
    }

    increaseStandardQuantity () {
        this.standardQuantity += 1
        this.totalQuantity += 1
    }

    addEvent(dataId) {
        this.contentShoppingCart.push(dataId)
        // this.setTimeout(dataId);



        // return function setTimeout () {
        //     const event = setTimeout(() => {
        //         this.contentShoppingCart.shift()
        //     }, this.duration)
    
        //     let end = this.duration;
            
        //     const timer = setInterval(() => {
        //         end -= this.step;
        //         if (end <= 900) clearInterval(timer);
        //         console.log(end)
        //     }, this.step)
    
        // }
  
    }

    



    // continueShopping () {

    // }

    clearList () {
        this.vipQuantity = 0;
        this.standardQuantity = 0;
        this.totalQuantity = 0;
        this.contentShoppingCart = [];
        
        
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

if (userBasket.totalQuantity !== 0 && refs.basketContainerHead.classList.contains("hidden")) {
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
    if (userBasket.totalQuantity !== 0 && refs.basketContainerHead.classList.contains("hidden")) refs.basketContainerHead.classList.remove("hidden")
    if (userBasket.totalQuantity === 0 && !refs.basketContainerHead.classList.contains("hidden")) refs.basketContainerHead.classList.add("hidden")
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
    onBasketEmpty();
}
function onBasketEmpty() {
    refs.basketTextFull.classList.add("hidden");
    refs.basketTextEmpty.classList.remove("hidden");
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

