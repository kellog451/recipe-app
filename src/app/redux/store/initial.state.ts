import { Ingredients } from 'src/app/models/ingredients.model';
import { AuthState } from '../reducers/auth.reducer';
import { ShoppingState } from '../reducers/shopping-list.reducer';

export interface AppState {
  auth: AuthState;
  shoppingList: ShoppingState;
}

export const appInitialState: AppState = {
  auth: {
    user: null,
  },

  shoppingList: {
    ingredients: [
      new Ingredients('Wheat Flour', 3),
      new Ingredients('Peas', 1),
      new Ingredients('Garlic', 1),
      new Ingredients('Baking Powder', 1),
    ],
    selectedIngredient: null,
    indexOfSelectedIngredient: -1,
  },
};
