import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse } from '@angular/common/http';

@Injectable()
export class RequestCache  {

  constructor() { }

  private cache = new Map();
  private maxAge = 3600000; // 60 minutes

  get(req: HttpRequest<any>): HttpResponse<any> | undefined {
    const url = req.urlWithParams;
    console.log('RequestCache - url - ' + url);
    const cached = this.cache.get(url);
    console.log('RequestCache - cached - ' + cached);
    if (!cached) {
      return undefined;
    }

    const isExpired = cached.lastRead < (Date.now() - this.maxAge);
    const expired = isExpired ? 'expired ' : '';
    return cached.response;
  }

  put(req: HttpRequest<any>, response: HttpResponse<any>): void {
    const url = req.urlWithParams;
    const entry = { url, response, lastRead: Date.now() };
    this.cache.set(url, entry);

    const expired = Date.now() - this.maxAge;
    this.cache.forEach(expiredEntry => {
      if (expiredEntry.lastRead < expired) {
        this.cache.delete(expiredEntry.url);
      }
    });
  }
}
