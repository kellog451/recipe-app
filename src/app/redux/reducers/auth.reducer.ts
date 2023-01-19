import { User } from 'src/app/models/user.model';
import { authActionTypes } from '../actions/auth.action';
import { appInitialState } from '../store/initial.state';

export interface AuthState {
  user: User;
}

export function authReducer(
  state = appInitialState.auth,
  action: { type: string; payload?: any }
) {
  switch (action.type) {
    case authActionTypes.LOGIN_USER_SUCCESS: {
      const user = new User(
        action.payload['id'],
        action.payload['email'],
        action.payload['token'],
        action.payload['tokenExpirationDate']
      );
      return { ...state, user };
    }

    case authActionTypes.LOGOUT_USER:
      return {
        ...state,
        user: null,
      };

    default:
      return state;
  }
  return state;
}
