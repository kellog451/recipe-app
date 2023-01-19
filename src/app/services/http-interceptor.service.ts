import {
  HttpHandler,
  HttpInterceptor,
  HttpParams,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { map, take } from 'rxjs';
import { exhaustMap } from 'rxjs/internal/operators/exhaustMap';
import { AppState } from '../redux/store/initial.state';

@Injectable()
export class HttpInterceptorService implements HttpInterceptor {
  constructor(private store: Store<AppState>) {}
  intercept(request: HttpRequest<any>, next: HttpHandler) {
    return this.store.select('auth').pipe(
      take(1),
      map((state) => {
        return state.user;
      }),
      exhaustMap((user) => {
        if (!user) {
          return next.handle(request);
        }
        const modifiedRequest = request.clone({
          params: new HttpParams().set('auth', user.token),
        });
        return next.handle(modifiedRequest);
      })
    );
  }
}
