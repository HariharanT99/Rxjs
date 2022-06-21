import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(public http: HttpClient) {}

  productUrl: string = 'https://fakestoreapi.com/products';

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.productUrl);
  }
}
