import { makeAutoObservable } from "mobx";

export default class BasketStore {
  constructor() {
    this._lengthBasket = 0;
    this._basket = [];
    makeAutoObservable(this);
  }

  setBasket(device) {
    this._basket = device;
  }

  setLengthBasket(length) {
    this._lengthBasket = length;
  }

  get basket() {
    return this._basket;
  }

  get lengthBasket() {
    return this._lengthBasket;
  }
}
