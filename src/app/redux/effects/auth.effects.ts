import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { AuthResponseData, AuthService } from 'src/app/services/auth.service';
import { environment } from 'src/environments/environment';
import {
  authActionTypes,
  LoginRequest,
  LoginUser,
  LoginUserError,
  SignUpRequest,
} from '../actions/auth.action';

@Injectable()
export class AuthEffects {
  APIKey = environment.firebaseAPIKey;
  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private router: Router,
    private authService: AuthService
  ) {}

  @Effect()
  authLogin = this.actions$.pipe(
    ofType(authActionTypes.LOGIN_USER_REQUEST),
    switchMap((authData: LoginRequest) => {
      return this.http
        .post<AuthResponseData>(
          `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${this.APIKey}`,
          {
            email: authData.payload.email,
            password: authData.payload.password,
            returnSecureToken: true,
          }
        )
        .pipe(
          // effects must never return an error.
          tap((authData) => {
            this.authService.setLogoutTimer(+authData.expiresIn * 1000);
          }),
          map((response) =>
            // return a new observable that dispatches an action
            handleAuthentication(
              response.localId,
              response.email,
              response.idToken,
              +response.expiresIn,
              true
            )
          ),
          catchError((errorResponse) => {
            return handleError(errorResponse);
          })
        );
    })
  );

  @Effect()
  authSignUp = this.actions$.pipe(
    ofType(authActionTypes.SIGNUP_USER_REQUEST),
    switchMap((authData: SignUpRequest) => {
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
          tap((authData) => {
            this.authService.setLogoutTimer(+authData.expiresIn * 1000);
          }),
          map((response) =>
            handleAuthentication(
              response.localId,
              response.email,
              response.idToken,
              +response.expiresIn,
              true
            )
          ),
          catchError((errorResponse) => handleError(errorResponse))
        );
    })
  );

  @Effect({ dispatch: false })
  authSuccess = this.actions$.pipe(
    ofType(authActionTypes.LOGIN_USER_SUCCESS),
    tap((authResponse: LoginUser) => {
      if (authResponse.payload.redirect) this.router.navigate(['/recipes']);
    })
  );

  @Effect({ dispatch: false })
  authLogout = this.actions$.pipe(
    ofType(authActionTypes.LOGOUT_USER, authActionTypes.AUTO_LOGOUT_USER),
    tap(() => {
      this.router.navigate(['/auth']);
      localStorage.removeItem('userData');
      this.authService.clearLogoutTimer();
    })
  );

  @Effect()
  autoLogin = this.actions$.pipe(
    ofType(authActionTypes.AUTO_LOGIN_USER),
    map(() => {
      const userData: {
        id: string;
        email: string;
        _token: string;
        tokenExpirationDate: Date;
      } = JSON.parse(localStorage.getItem('userData'));

      if (userData) {
        const loadedUser = new User(
          userData.id,
          userData.email,
          userData._token,
          userData.tokenExpirationDate
        );

        if (loadedUser.token) {
          const timeToExpire =
            new Date(userData.tokenExpirationDate).getTime() -
            new Date().getTime();

          this.authService.setLogoutTimer(timeToExpire);

          return new LoginUser({
            id: userData.id,
            email: userData.email,
            token: userData._token,
            tokenExpirationDate: userData.tokenExpirationDate,
            redirect: false,
          });
        }
      }
      return { type: 'NULL' };
    })
  );
}

const handleAuthentication = (
  userId: string,
  email: string,
  token: string,
  expiresIn: number,
  redirect: boolean
) => {
  const user = new User(
    userId,
    email,
    token,
    new Date(new Date().getTime() + expiresIn * 1000)
  );

  localStorage.setItem('userData', JSON.stringify(user));

  return new LoginUser({
    id: userId,
    email,
    token,
    tokenExpirationDate: new Date(new Date().getTime() + expiresIn * 1000),
    redirect,
  });
};

const handleError = (errorResponse: HttpErrorResponse) => {
  let errorMessage = 'An Unknown Error Occurred';
  if (!errorResponse.error || !errorResponse.error.error) {
    return of(new LoginUserError(errorMessage));
  }
  switch (errorResponse.error.error.message) {
    case 'EMAIL_EXISTS':
      errorMessage = 'This Email already exists';
      break;
    case 'EMAIL_NOT_FOUND':
    case 'INVALID_PASSWORD':
      errorMessage = 'Invalid Login information';
      break;
  }
  return of(new LoginUserError(errorMessage));
};
