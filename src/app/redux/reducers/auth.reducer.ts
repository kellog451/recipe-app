import { User } from 'src/app/models/user.model';
import { authActionTypes } from '../actions/auth.action';
import { appInitialState } from '../store/initial.state';

export function authReducer(
  state = appInitialState.auth,
  action: { type: string; payload?: any }
) {
  switch (action.type) {
    case authActionTypes.LOGIN_USER_REQUEST:
      return { ...state, loading: true, authError: null };

    case authActionTypes.LOGIN_USER_SUCCESS: {
      const user = new User(
        action.payload['id'],
        action.payload['email'],
        action.payload['token'],
        action.payload['tokenExpirationDate']
      );
      return { ...state, user, loading: false };
    }

    case authActionTypes.LOGIN_USER_ERROR:
      return {
        ...state,
        user: null,
        loading: false,
        authError: action.payload,
      };

    case authActionTypes.SIGNUP_USER_REQUEST:
      return { ...state, loading: true, authError: null };

    case authActionTypes.SIGNUP_USER_SUCCESS: {
      const user = new User(
        action.payload['id'],
        action.payload['email'],
        action.payload['token'],
        action.payload['tokenExpirationDate']
      );
      return { ...state, user, loading: false };
    }

    case authActionTypes.SIGNUP_USER_ERROR:
      return {
        ...state,
        user: null,
        loading: false,
        authError: action.payload,
      };

    case authActionTypes.LOGOUT_USER:
    case authActionTypes.AUTO_LOGOUT_USER:
      return {
        ...state,
        user: null,
      };

    case authActionTypes.CLEAR_ERROR:
      return {
        ...state,
        authError: null,
      };

    default:
      return state;
  }
}
