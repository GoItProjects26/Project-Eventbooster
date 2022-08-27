import {refs} from "./refs"



// refs.basketVipBtn.addEventListener("click", onClickVipBtn);
// refs.basketVipBtn.addEventListener("click", onClickStandardBtn);


function onClickVipBtn (event) {

}


class Basket {
    constructor () {
        this.contentShoppingCart = [];
        this.vipQuantity = 0;
        this.standardQuantity = 0;
        this.totalQuantity = this.vipQuantity + this.standardQuantity
    }

    increaseVipQuantity () {
        this.quantity += 1
    }

    increaseStandardQuantity () {
        this.quantity += 1
    }

    // continueShopping () {

    // }

    clearList () {
        this.vipQuantity = 0;
        this.standardQuantity = 0;
    }
}

const userBasket = new Basket;
export default userBasket;
// refs.basketQuantity.textContent = userBasket.totalQuantity
// refs.basketNum.textContent = userBasket.totalQuantity
if (userBasket.totalQuantity === 0 && !refs.basketNum.classList.contains("hidden")) refs.basketNum.classList.add("hidden")


refs.basketContinueBookingBtn.addEventListener("click", onClickBasketContinueShoppingBtn);
function onClickBasketContinueShoppingBtn (event) {
    refs.basketModal.classList.toggle("hidden")
}

refs.basketBuyBtn.addEventListener("click", onClickBuyBtn)
function onClickBuyBtn (event) {
    console.log("вы купили милион билетов")
}

refs.basketClearBtn.addEventListener("click", onClickClearBtn)
function onClickClearBtn(event) {
    console.log("basketClearBtn")
    // this.clearList()
    refs.basketQuantity.textContent = userBasket.totalQuantity
    refs.basketMarkupContainer.innerHTML = "";
}

function onClickStandardBuyBtn (event) {
    this.contentShoppingCart.push({})
    this.increaseStandardQuantity()
    refs.miniModal.classList.toggle("hidden")
    //добавить закрытие модалки//
}

function onClickVipBuyBtn (event) {
    this.contentShoppingCart.push({})
    this.increaseVipQuantity()
    refs.miniModal.classList.toggle("hidden")
     //добавить закрытие модалки//
}

