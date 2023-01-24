import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AutoLogout } from '../redux/actions/auth.action';
import { AppState } from '../redux/store/initial.state';

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
  constructor(private store: Store<AppState>) {}

  private tokenExpirationTimer: any;

  clearLogoutTimer() {
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
      this.tokenExpirationTimer = null;
    }
  }

  setLogoutTimer(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.store.dispatch(new AutoLogout());
    }, expirationDuration);
  }
}
