import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart-status',
  templateUrl: './cart-status.component.html',
  styleUrls: ['./cart-status.component.css']
})
export class CartStatusComponent implements OnInit {

  priceTotal: number = 0.00;
  quantityTotal: number = 0;

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.priceAndQuantity();
  }

  priceAndQuantity() {
    this.cartService.totalPrice.subscribe(data => {
      this.priceTotal = data;
    })
    this.cartService.totalQuantity.subscribe(data => {
      this.quantityTotal = Math.round(data);
    })
  }

}
