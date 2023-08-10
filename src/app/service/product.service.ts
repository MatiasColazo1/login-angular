import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Product } from '../interfaces/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private myAppUrl: string;
  private myApiUrl: string;

  constructor(private http: HttpClient) { 
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = "api/products/";
  }

  getProducts(): Observable<Product[]>{
    /*const token = localStorage.getItem("token")
    const headers = new HttpHeaders().set("Authorization", `Bearer ${token}` )
    return this.http.get<Product[]>(`${this.myAppUrl}${this.myApiUrl}`, { headers: headers} )*/
    return this.http.get<Product[]>(`${this.myAppUrl}${this.myApiUrl}`)
  }

  getListProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.myAppUrl}${this.myApiUrl}`);
   }

  
  deleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(`${this.myAppUrl}${this.myApiUrl}${id}`)
  }

  saveProduct(product: Product): Observable<void> {
    return this.http.post<void>(`${this.myAppUrl}${this.myApiUrl}`, product)
  }

  getProduct(id: number): Observable<Product>{
    return this.http.get<Product>(`${this.myAppUrl}${this.myApiUrl}${id}`)
  }

  updateProduct(id: number, product: Product): Observable<void> {
    return this.http.put<void>(`${this.myAppUrl}${this.myApiUrl}${id}`, product);
  }
}
