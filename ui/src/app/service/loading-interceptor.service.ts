import { Injectable } from '@angular/core';
import { throwError as observableThrowError, Observable, of } from 'rxjs';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse } from '@angular/common/http';

import { LoaderService } from './loader.service';
import { getBaseLocation } from './common-functions';

import { catchError, tap, finalize } from 'rxjs/operators';
import { InterceptorHttpParams } from '../model/InterceptorHttpParams';
import { RequestCache } from './RequestCache';
import { environment } from '../../environments/environment';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {

  constructor(
    private loaderService: LoaderService,
    private cache: RequestCache
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Use the below two lines of code for a war file
    console.log(' environment.baseUrl -- ' + environment.baseUrl);
    //const url = getBaseLocation();
    // console.log("url - " + url);
    // Use the below two lines of code for a jar file
    const url = environment.baseUrl;
    console.log("url - " + url);

    req = req.clone({
      url: url + req.url
    });

    const cachedResponse = this.cache.get(req);
    console.log('LoadingInterceptor - cachedResponse - ' + cachedResponse);
    if (cachedResponse && req.params instanceof InterceptorHttpParams && req.params.interceptorConfig.cacheRequest) {
      return of(cachedResponse);
    } else {
      this.beforeRequest(req);
      return next.handle(req).pipe(
        tap((event: HttpEvent<any>) => {
          if (event instanceof HttpResponse
            && req.params instanceof InterceptorHttpParams && req.params.interceptorConfig.cacheRequest) {
            this.cache.put(req, event);
          }
          this.onSuccess(event);
        }),
        catchError((error: any) => {
          return this.onError(error);
        }),
        finalize(() => {
          this.loaderService.hideLoader();
        })
      );
    }
  }

  /**
   * Before any Request.
   */
  private beforeRequest(req): void {
    // Check if we need to display the loader
    /* const hideLoader = req.params.get('hideLoader');
     if (hideLoader !== 'true') {
         this.loaderService.showLoader();
     }*/
  
    if (!(req.params instanceof InterceptorHttpParams && req.params.interceptorConfig.hideLoader)) {
      console.log('showing loader');
      this.loaderService.showLoader();
    }
  }

  /**
   * onSuccess.
   */
  private onSuccess(event: HttpEvent<any>): void {
    // if the event is for http response
    if (event instanceof HttpResponse) {
      // stop our loader here
      this.loaderService.hideLoader();
    }
  }

  /**
   * onError
   * @param error
   */
  private onError(error: any): Observable<HttpEvent<any>> {
    // if any error (not for just HttpResponse) we stop our loader bar
    this.loaderService.hideLoader();
    return observableThrowError(error);
  }
}
