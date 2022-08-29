import {refs} from "./refs";
export {userBasket, onClickBasketBackdrop, onEscKeyPressBasket, ESC_KEY_CODE, onBasketShow}
import userEventApi from "./api"

const ESC_KEY_CODE = "Escape";

function convertMs(ms) {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
    const days = Math.floor(ms / day);
    const hours = Math.floor((ms % day) / hour);
    const minutes = Math.floor(((ms % day) % hour) / minute);
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  
    return { days, hours, minutes, seconds };
}

function addLeadingZero(Obj) {
    for(let key in Obj) {
        Obj[key] =`${(Obj[key])}`.padStart(2, 0)}
    return Obj;
}


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
    
    // if (!userBasket.isBasketEmpty) {
    //     refs.basketTimer.innerHTML = ""} else{ refs.basketTimer.textContent = `${minutes} : ${seconds}`}
}

function calculateTime(obj) {
    const begin = obj?.contentShoppingCart[0]?.timer;

    const end = begin + userBasket.duration
    let passedTime = end - Date.now();
    return addLeadingZero(convertMs(passedTime));
}

function setTimer (basketObj) {

return timerId =  setInterval(()=>{
        let {minutes, seconds} = calculateTime(basketObj)
        refs.basketTimer.textContent = `${minutes} : ${seconds}`;
    }, this.step)

}

function deleteTimer (id) {
    clearInterval(id)
}


function onBasketFull () {
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


class Basket {
    constructor () {
        this.contentShoppingCart = [];
        this.vipQuantity = 0;
        this.standardQuantity = 0;
        this.totalQuantity = 0;
        this.duration = 900000;
        this.step = 1000;
        this.isBasketEmpty = true;
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
        dataId.timer = Date.now();
        this.contentShoppingCart.push(dataId);
    }

    clearEvent(dataId) {
        this.contentShoppingCart.shift()
    }
   
        
  
        
        
            //     const event = setTimeout(() => {
            //         this.contentShoppingCart.shift()
            //     }, this.duration)
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
    onBasketEmpty();
    userBasket.isBasketEmpty = true;

}
function onBasketEmpty() {
    refs.basketTextFull.classList.add("hidden");
    refs.basketTextEmpty.classList.remove("hidden");
    deleteTimer(timerId)
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

