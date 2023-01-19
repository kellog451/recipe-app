import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, tap, throwError } from 'rxjs';
import { User } from '../models/user.model';
import { environment } from 'src/environments/environment';
import { Store } from '@ngrx/store';
import { AppState } from '../redux/store/initial.state';
import { LoginUser, LogoutUser } from '../redux/actions/auth.action';

export interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // user = new BehaviorSubject<User>(null);

  APIKey = environment.firebaseAPIKey;
  constructor(
    private http: HttpClient,
    private router: Router,
    private store: Store<AppState>
  ) {}

  private tokenExpirationTimer: any;

  // error handling operator func passed to catchError
  private handleError(errorResponse: HttpErrorResponse) {
    console.log('#####', errorResponse);
    let errorMessage = 'An Unknown Error Occurred';
    if (!errorResponse.error || !errorResponse.error.error) {
      return throwError(() => new Error(errorMessage));
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
    return throwError(() => new Error(errorMessage));
  }

  private handleAuthentication(
    userId: string,
    email: string,
    token: string,
    expiresIn: number
  ) {
    const user = new User(
      userId,
      email,
      token,
      new Date(new Date().getTime() + expiresIn * 1000)
    );

    // this.user.next(user);
    this.store.dispatch(
      new LoginUser({
        id: userId,
        email,
        token,
        tokenExpirationDate: new Date(new Date().getTime() + expiresIn * 1000),
      })
    );
    this.autoLogout(expiresIn * 1000);
    localStorage.setItem('userData', JSON.stringify(user));
  }

  signUp(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${this.APIKey}`,
        {
          email,
          password,
          returnSecureToken: true,
        }
      )
      .pipe(
        catchError(this.handleError),
        tap((response) => {
          this.handleAuthentication(
            response.localId,
            response.email,
            response.idToken,
            +response.expiresIn
          );
        })
      );
  }

  signIn(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${this.APIKey}`,
        {
          email,
          password,
          returnSecureToken: true,
        }
      )
      .pipe(
        catchError(this.handleError),
        tap((response) => {
          this.handleAuthentication(
            response.localId,
            response.email,
            response.idToken,
            +response.expiresIn
          );
        })
      );
  }

  logout() {
    // this.user.next(null);
    this.store.dispatch(new LogoutUser());
    this.router.navigate(['/auth']);
    localStorage.removeItem('userData');
    if (this.tokenExpirationTimer) clearTimeout(this.tokenExpirationTimer);
    this.tokenExpirationTimer = null;
  }

  autoLogout(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }

  autoLogin() {
    const userData: {
      id: string;
      email: string;
      _token: string;
      tokenExpirationDate: Date;
    } = JSON.parse(localStorage.getItem('userData'));

    if (!userData) {
      return null;
    } else {
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
        // this.user.next(loadedUser);
        this.store.dispatch(
          new LoginUser({
            id: userData.id,
            email: userData.email,
            token: userData._token,
            tokenExpirationDate: userData.tokenExpirationDate,
          })
        );
        this.autoLogout(timeToExpire);
      }
    }
  }
}
