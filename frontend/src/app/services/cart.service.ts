import { Injectable } from '@angular/core';
import { BehaviorSubject, ReplaySubject, Subject } from 'rxjs';
import { CartItem } from '../common/cart-item';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartItems: CartItem[] = [];

  totalPrice: Subject<number> = new BehaviorSubject<number>(0);
  totalQuantity: Subject<number> = new BehaviorSubject<number>(0);

  //sessionStorage - stores data of single tab
  // localStorage - stores data across the tabs and browser restart
  // both do not store data across multipe browsers and incognito mode
  storage: Storage = localStorage;

  constructor() {

    // read data from local storage
    let data = JSON.parse(this.storage.getItem('cartItems'));

    if (data != null) {
      this.cartItems = data;
    }

    // compute totals based on the data that are read from the storage
    this.computeCartTotals();

  }

  addToCart(cartItem: CartItem) {

    // check if we already have item in the cart
    let alreadyExistsInCart: boolean = false;
    let existingCartItem: CartItem | undefined;
    if (this.cartItems.length > 0) {
      // find the item in the cart based on the item id
      existingCartItem = this.cartItems.find(item => item.id === cartItem.id);

      // check if we found it
      alreadyExistsInCart = (existingCartItem != undefined);
    }

    if (alreadyExistsInCart) {
      existingCartItem.quantity++;
    }
    else {
      this.cartItems.push(cartItem);
    }

    // compute cart total price and total quantity
    this.computeCartTotals();

  }

  computeCartTotals() {

    let totalPriceValue: number = 0;
    let totalQuantityValue: number = 0;
    for (let item of this.cartItems) {
      totalPriceValue += item.unitPrice * item.quantity;
      totalQuantityValue += item.quantity;
    }

    // publish the new values --- all subscribers will receive the new data
    this.totalPrice.next(totalPriceValue);
    this.totalQuantity.next(totalQuantityValue);
    console.log(`TotalQualtity = ${totalQuantityValue} and total price = ${totalPriceValue}`);

    // persist the cart data
    this.persistCartItems();

  }

  persistCartItems() {
    this.storage.setItem('cartItems', JSON.stringify(this.cartItems));
  }

  removeFromCart(cartItem: CartItem) {
    cartItem.quantity--;
    if (cartItem.quantity === 0)
      this.remove(cartItem);
    else
      this.computeCartTotals();
  }

  remove(cartItem: CartItem) { // remove the item from the cart
    const itemIndex = this.cartItems.findIndex(item => item.id == cartItem.id); // find the index of the item
    this.cartItems.splice(itemIndex, 1); // remove the item from cart item list
    this.computeCartTotals(); // retotals
  }

}
