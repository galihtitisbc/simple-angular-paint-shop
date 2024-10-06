import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/product';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root',
})
export class CartService {
  private apiUrl: string = environment.apiUrl + '/cart';

  constructor(private http: HttpClient) {}

  getCarts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl);
  }

  addToCart(product: Product): Observable<Product> {
    return this.http.post<Product>(this.apiUrl, product);
  }

  clearCart(): Observable<void> {
    return this.http.delete<void>(this.apiUrl);
  }
}
