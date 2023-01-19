import { HttpClient } from '@angular/common/http';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { throwError } from 'rxjs';
import { of } from 'rxjs/internal/observable/of';
import { catchError } from 'rxjs/internal/operators/catchError';
import { map } from 'rxjs/internal/operators/map';
import { switchMap } from 'rxjs/internal/operators/switchMap';
import { AuthResponseData } from 'src/app/services/auth.service';
import { environment } from 'src/environments/environment';
import { authActionTypes, LoginRequest } from '../actions/auth.action';

export class AuthEffects {
  APIKey = environment.firebaseAPIKey;
  constructor(private actions$: Actions, private http: HttpClient) {}

  @Effect()
  authLogin = this.actions$.pipe(
    ofType(authActionTypes.LOGIN_USER_REQUEST),
    switchMap((authData: LoginRequest) => {
      return this.http
        .post<AuthResponseData>(
          `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${this.APIKey}`,
          {
            email: authData.payload.email,
            password: authData.payload.password,
            returnSecureToken: true,
          }
        )
        .pipe(
          catchError(() => of()),
          map(() => {})
        );
    })
  );
}
