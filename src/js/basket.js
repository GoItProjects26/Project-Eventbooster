import {refs} from "./refs";
export {Basket}
import userEventApi from "./api"



// refs.basketVipBtn.addEventListener("click", onClickVipBtn);
// refs.basketVipBtn.addEventListener("click", onClickStandardBtn);


function onClickVipBtn (event) {

}

refs.basketHead.addEventListener("click", onClickBasketHead);
function onClickBasketHead (event) {
    refs.basketModal.classList.toggle("hidden")
   
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

  
    }

    setTimeout () {
        const event = setTimeout(() => {
            this.contentShoppingCart.shift()
        }, this.duration)

        let end = this.duration;
        
        const timer = setInterval(() => {
            end -= this.step;
            if (end <= 900) clearInterval(timer);
            console.log(end)
        }, this.step)

    }



    // continueShopping () {

    // }

    clearList () {
        this.vipQuantity = 0;
        this.standardQuantity = 0;
        this.totalQuantity = 0;
        
        
    }


}

export default userBasket;
// refs.basketQuantity.textContent = userBasket.totalQuantity
// refs.basketNum.textContent = userBasket.totalQuantity
if (userBasket.totalQuantity === 0 && !refs.basketNum.classList.contains("hidden")) refs.basketNum.classList.add("hidden")


refs.basketContinueBookingBtn.addEventListener("click", onClickBasketContinueShoppingBtn);
function onClickBasketContinueShoppingBtn (event) {
    refs.basketModal.classList.toggle("hidden")
    if (userBasket.totalQuantity !== 0 && refs.basketContainerHead.classList.contains("hidden")) refs.basketContainerHead.classList.remove("hidden")
    if (userBasket.totalQuantity === 0 && !refs.basketContainerHead.classList.contains("hidden")) refs.basketContainerHead.classList.add("hidden")
    
    refs.basketNumHead.textContent = userBasket.totalQuantity;
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

