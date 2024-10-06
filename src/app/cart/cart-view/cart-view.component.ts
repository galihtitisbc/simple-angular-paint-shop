import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';
import { Product } from '../../models/product';
@Component({
  selector: 'cart-view',
  templateUrl: './cart-view.component.html',
  styleUrl: './cart-view.component.css',
})
export class CartViewComponent implements OnInit {
  carts: Product[] = [];
  totalPrice: number = 0;
  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartService.getCarts().subscribe((data) => {
      this.carts = data;
      this.totalPrice = this.getTotalPrice();
    });
  }
  getTotalPrice(): number {
    let total = 0;
    for (const price of this.carts) {
      total += price.price;
    }
    return total;
  }

  clearCart(): void {
    this.cartService.clearCart().subscribe();
  }
}
