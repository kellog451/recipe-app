import { ActionReducerMap } from '@ngrx/store';
import { AppState } from '../store/initial.state';
import { authReducer } from './auth.reducer';
import { shoppingListReducer } from './shopping-list.reducer';

export const rootReducer: ActionReducerMap<AppState> = {
  auth: authReducer,
  shoppingList: shoppingListReducer,
};
