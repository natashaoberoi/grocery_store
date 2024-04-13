import { Injectable } from '@angular/core';
//import {Product} from './product';
//import {PRODUCTS} from './mock-products';

import { HttpClient,HttpHeaders } from '@angular/common/http';
import { InterceptorHttpParams } from '../model/InterceptorHttpParams';
import { catchError } from 'rxjs/operators';
import { Observable, throwError as observableThrowError } from 'rxjs/';

import { EvsError } from '../model/evsError';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  id = 0;

  constructor(private http: HttpClient) { }

  httpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    'X-Content-Type-Options': 'nosniff'
});

  getProducts(): Observable<any> {
    return this.http.get(
      'http://127.0.0.1:5000/getProducts',
      {
        headers: this.httpHeaders,
        params: new InterceptorHttpParams({
          hideLoader: false,
          cacheRequest: false
        }

        )

      }
    ).pipe(
      catchError((response) => {
        var modError = new EvsError(response.error, response.error.message);
        modError.displayNotification = true;
        return observableThrowError(modError);
      })
    );
  
  }

  deleteProduct(id) {
    const formData = new FormData();
    formData.append('product_id', id);

    const url = "http://127.0.0.1:5000/deleteProduct";
    return this.http.post<any>(url, formData, {
      params: new InterceptorHttpParams({
        hideLoader: true,
        cacheRequest: false
      }
      )
    })
      .pipe(
        catchError((error) => {
          console.log(error)
          return observableThrowError(new EvsError(error, 'Failure in deleting product'));
        })
      );
  }

  addProduct(productData) {
    const formData = new FormData();
    formData.append('data', JSON.stringify(productData));

    const url = "http://127.0.0.1:5000/insertProduct";
    return this.http.post<any>(url, formData, {
      params: new InterceptorHttpParams({
        hideLoader: true,
        cacheRequest: false
      }
      )
    })
      .pipe(
        catchError((error) => {
          console.log(error)
          return observableThrowError(new EvsError(error, 'Failure in adding product'));
        })
      );
  }
/** 
  deleteProduct(id: number): Observable<unknown>{
    return this.http.post
  }


  deleteHero(id: number): Observable<unknown> {
    const url = `${this.heroesUrl}/${id}`; // DELETE api/heroes/42
    return this.http.delete(url, httpOptions)
      .pipe(
        catchError(this.handleError('deleteHero'))
      );
  }*/
}
