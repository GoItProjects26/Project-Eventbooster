export default class Basket {

    constructor () {
        this.contentShoppingCart = [];
        this.vipQuantity = 0;
        this.standardQuantity = 0;
        this.totalQuantity = 0;
        this.duration = 120000;
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

  clearList() {
    this.vipQuantity = 0;
    this.standardQuantity = 0;
    this.totalQuantity = 0;
    this.contentShoppingCart = [];
  }
}
