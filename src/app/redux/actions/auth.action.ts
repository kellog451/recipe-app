import { Action } from '@ngrx/store';
import { User } from 'src/app/models/user.model';

export const authActionTypes = {
  LOGIN_USER_REQUEST: '[Auth] LOGIN_USER_REQUEST',
  LOGIN_USER_SUCCESS: '[Auth] LOGIN_USER_SUCCESS',
  LOGIN_USER_ERROR: '[Auth] LOGIN_USER_ERROR',

  SIGNUP_USER_REQUEST: '[Auth] SIGNUP_USER_REQUEST',
  SIGNUP_USER_SUCCESS: '[Auth] SIGNUP_USER_SUCCESS',
  SIGNUP_USER_ERROR: '[Auth] SIGNUP_USER_ERROR',

  AUTO_LOGIN_USER: '[Auth] AUTO_LOGIN_USER',
  AUTO_LOGOUT_USER: '[Auth] AUTO_LOGOUT_USER',

  LOGOUT_USER: '[Auth] LOGOUT_USER',
  CLEAR_ERROR: '[Auth] CLEAR_ERROR',
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
      redirect: boolean;
    }
  ) {}
}

export class LoginUserError implements Action {
  readonly type: string = authActionTypes.LOGIN_USER_ERROR;
  constructor(public payload: string) {}
}

export class SignUpRequest implements Action {
  readonly type: string = authActionTypes.SIGNUP_USER_REQUEST;
  constructor(
    public payload: {
      email: string;
      password: string;
    }
  ) {}
}

export class SignUpSuccess implements Action {
  readonly type: string = authActionTypes.SIGNUP_USER_SUCCESS;
  constructor(
    public payload: {
      id: string;
      email: string;
      token: string;
      tokenExpirationDate: Date;
    }
  ) {}
}

export class SignUpError implements Action {
  readonly type: string = authActionTypes.SIGNUP_USER_ERROR;
  constructor(public payload: string) {}
}

export class LogoutUser implements Action {
  readonly type: string = authActionTypes.LOGOUT_USER;
}

export class ClearError implements Action {
  readonly type: string = authActionTypes.CLEAR_ERROR;
}
export class AutoLogin implements Action {
  readonly type: string = authActionTypes.AUTO_LOGIN_USER;
}
export class AutoLogout implements Action {
  readonly type: string = authActionTypes.AUTO_LOGOUT_USER;
}
