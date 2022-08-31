export default class Basket {

    constructor () {
        this.contentShoppingCart = [];
        this.vipQuantity = 0;
        this.standardQuantity = 0;
        this.totalQuantity = 0;
        this.duration = 600000;
        this.step = 1000;
        this.isBasketEmpty = true;
    }


  increaseVipQuantity() {
    this.vipQuantity += 1;
    this.totalQuantity += 1;
  }

  increaseStandardQuantity() {
    this.standardQuantity += 1;
    this.totalQuantity += 1;
  }

  decreaseStandardQuantity() {
    this.standardQuantity -= 1;
    this.totalQuantity -= 1;
  }

  addEvent(dataId) {
    dataId.timer = Date.now();
    this.contentShoppingCart.push(dataId);
  }


  clearByTimerEvent() {
    this.contentShoppingCart.shift();
    if (this.standardQuantity > 0) this.decreaseStandardQuantity();
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

  clearList() {
    this.vipQuantity = 0;
    this.standardQuantity = 0;
    this.totalQuantity = 0;
    this.contentShoppingCart = [];
  }
}
