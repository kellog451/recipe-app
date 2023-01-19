import { Action } from '@ngrx/store';
import { User } from 'src/app/models/user.model';

export const authActionTypes = {
  LOGIN_USER_REQUEST: '[Auth] LOGIN_USER_REQUEST',
  LOGIN_USER_SUCCESS: '[Auth] LOGIN_USER_SUCCESS',
  LOGIN_USER_ERROR: '[Auth] LOGIN_USER_ERROR',
  LOGOUT_USER: '[Auth] LOGOUT_USER',
};

export class LoginRequest implements Action {
  readonly type: string = authActionTypes.LOGIN_USER_REQUEST;
  constructor(
    public payload: {
      email: string;
      password: string;
    }
  ) {}
}

export class LoginUser implements Action {
  readonly type: string = authActionTypes.LOGIN_USER_SUCCESS;
  constructor(
    public payload: {
      id: string;
      email: string;
      token: string;
      tokenExpirationDate: Date;
    }
  ) {}
}

export class LogoutUser implements Action {
  readonly type: string = authActionTypes.LOGOUT_USER;
}
