import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, Observable, throwError } from 'rxjs';
import { Country } from './country';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private http: HttpClient,private httpClient : HttpClient) { }

  apiUrl: string = 'https://fakestoreapi.com/products'; 
  cartApiUrl: string = 'https://fakestoreapi.com/carts';
  userApiUrl: string = 'https://fakestoreapi.com/users';

  // GetProducts() : Observable<any>{
  //   return this.http.get(this.apiUrl).pipe((result: any) => {
  //     return result;
  //   })
  // }

  GetProducts() {
    return this.http.get(this.apiUrl).pipe((result: any) => {
      return result;
    });
  }

  GetCarts() {
    return this.http.get(this.cartApiUrl).pipe((result: any) => {
      return result;
    })
  }

  GetUserList() {
    return this.http.get(this.userApiUrl).pipe((result: any) => {
      return result;
    })
  }

   searchCountryByName(name: string): Observable<Country[]>{
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('Accept', 'application/json');
    headers = headers.append(
      'X-RapidAPI-Key',
      '1108554cc1mshf11c17c4fea2b3dp179054jsn2446fb7a8965'
    );
    return this.httpClient.get(
      `https://restcountries-v1.p.rapidapi.com/capital/` + name, 
       {headers: headers}
      ).pipe(
           map((data:any) => {
             return data;
           }), catchError( error => {
             return throwError( 'Incorrect Url' );
           })
        )
    }
}
