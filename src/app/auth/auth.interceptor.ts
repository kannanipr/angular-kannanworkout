import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthStateService } from './auth-state.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private _authStateService: AuthStateService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    const userId = this._authStateService.getUserId();

    const authReq = request.clone({
      headers: request.headers.set('user-id', userId ? userId : '')
    });

    return next.handle(authReq);
  }
}
