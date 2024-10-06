import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { Product } from '../../models/product';
import { CartService } from '../../cart/cart.service';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'product-list',
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css',
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  filteredProduct: Product[] = [];
  sortOrder: string = '';
  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.productService.getProducts().subscribe((data) => {
      this.products = data;
      this.filteredProduct = data;
    });
  }
  addToCart(product: Product): void {
    this.cartService.addToCart(product).subscribe({
      next: () => {
        this.snackBar.open('Added To Cart');
      },
    });
  }
  applyFilter(event: Event): void {
    let searchTerm = (event.target as HTMLInputElement).value;
    searchTerm = searchTerm.toLowerCase();
    this.filteredProduct = this.products.filter((product) =>
      product.name.toLowerCase().includes(searchTerm)
    );
    this.sortProduct(this.sortOrder);
  }
  sortProduct(sortValue: string): void {
    this.sortOrder = sortValue;
    if (this.sortOrder === 'priceLowToHigh') {
      this.filteredProduct.sort((a, b) => a.price - b.price);
    } else if (this.sortOrder === 'priceHighToLow') {
      this.filteredProduct.sort((a, b) => b.price - a.price);
    }
  }
}
