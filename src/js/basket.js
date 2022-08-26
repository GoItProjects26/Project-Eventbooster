import refs from "./refs"



// refs.basketVipBtn.addEventListener("click", onClickVipBtn);
// refs.basketVipBtn.addEventListener("click", onClickStandardBtn);


function onClickVipBtn (event) {

}


class Basket {
    constructor () {
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

    continueShopping () {

    }

    clearList () {
        this.vipQuantity = 0;
        this.standardQuantity = 0;
    }



}