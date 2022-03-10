import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
  HttpInterceptor, HttpRequest, HttpHandler,
  HttpErrorResponse, HTTP_INTERCEPTORS, HttpEvent,
} from '@angular/common/http';
import { take, filter, catchError, switchMap } from 'rxjs/operators';
import { throwError, Observable, BehaviorSubject } from 'rxjs';

import { AuthService } from './auth.service';
import { config } from 'app/config';

const AUTHORIZATION_HEADER_KEY = 'Authorization';
const TYPE_TOKEN = 'Bearer';

@Injectable({
  providedIn: 'root',
})
export class AuthInterceptorService implements HttpInterceptor {

  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  private url: string = config.api.remoteAuth;

  constructor(private authService: AuthService, private router: Router) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(this.addToken(request)).
      pipe(
        catchError(error => {
          if (error instanceof HttpErrorResponse) {
            if (request.url === `${this.url}/${config.api.token}` ||
              request.url === `${config.api.remote}/${config.api.logout}`) { // Verifica que es login
              return throwError(error);
            }
            switch ((<HttpErrorResponse>error).status) {
              case 400: {
                if (request.url.indexOf('refresh-token') > 0) {
                  this.router.navigate(['/auth']);
                }
                return this.handle400Error(error, request);
              }
              case 401:
                return this.handle401Error(request, next);
              default:
                return throwError(error);
            }
          } else {
            return throwError(error);
          }
        }),
      );
  }

  private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);
      return this.authService.refreshToken().pipe(
        switchMap((token: any) => {
          this.isRefreshing = false;
          this.refreshTokenSubject.next(token.access_token);
          return next.handle(this.addToken(request));
        }),
      );
    } else {
      return this.refreshTokenSubject.pipe(
        filter(token => token != null),
        take(1),
        switchMap(() => {
          this.isRefreshing = false;
          return next.handle(this.addToken(request));
        }),
      );
    }
  }

  private handle400Error(error: any, request: any) {
    if (error && error.status === 400 && error.error && error.error.error === 'invalid_grant'
      && request.url.indexOf('authentication') < 0) {
      this.authService.logout();
      return throwError(error);
    }
    return throwError(error);
  }

  private addToken(request: HttpRequest<any>) {
    let newRequest: HttpRequest<any>;
    const token: string = localStorage.getItem('access_token');
    if (request.url.indexOf('refresh-token') > 0 || request.url.indexOf('authentication') > 0) {
      request.headers.delete(AUTHORIZATION_HEADER_KEY);
      newRequest = request.clone();
    } else {
      newRequest = request.clone({ headers: request.headers.set(AUTHORIZATION_HEADER_KEY, `${TYPE_TOKEN} ${token}`) });
    }
    return newRequest;
  }
}

export const authInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true },
];
