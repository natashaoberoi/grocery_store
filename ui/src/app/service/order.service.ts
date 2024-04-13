import { Injectable } from '@angular/core';

import { HttpClient,HttpHeaders } from '@angular/common/http';
import { InterceptorHttpParams } from '../model/InterceptorHttpParams';
import { catchError } from 'rxjs/operators';
import { Observable, throwError as observableThrowError } from 'rxjs/';
import { EvsError } from '../model/evsError';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) { }

  httpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    'X-Content-Type-Options': 'nosniff'
});

  getOrders(): Observable<any> {
    return this.http.get(
      'http://127.0.0.1:5000/getOrders',
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
        console.log(response)
        return observableThrowError(new EvsError(response, 'Failure in getting orders'))
      })
    );
  
  }

  getOrderDetails(id) {
    const param: any = {};
    param.order_id = id;

    const url = "http://127.0.0.1:5000/getOrderDetails";
    return this.http.get<any>(url, {
      headers: this.httpHeaders,
      params: new InterceptorHttpParams({
        hideLoader: true,
        cacheRequest: false
      },
      param
      )
    })
      .pipe(
        catchError((error) => {
          console.log(error)
          return observableThrowError(new EvsError(error, 'Failure in getting order details'));
        })
      );
  }

  deleteOrder(id) {
    const formData = new FormData();
    formData.append('order_id', id);

    const url = "http://127.0.0.1:5000/deleteOrder";
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
          return observableThrowError(new EvsError(error, 'Failure in deleting order'));
        })
      );
  }

  insertOrder(data) {
    const formData = new FormData();
    formData.append('data', JSON.stringify(data));

    const url = "http://127.0.0.1:5000/insertOrder";
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
          return observableThrowError(new EvsError(error, 'Failure in adding order'));
        })
      );
  }

}
