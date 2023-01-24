import { Ingredients } from 'src/app/models/ingredients.model';
import { User } from 'src/app/models/user.model';

export interface AppState {
  auth: {
    loading: boolean;
    user: User;
    authError: string;
  };
  shoppingList: {
    ingredients: Ingredients[];
    selectedIngredient: Ingredients;
    indexOfSelectedIngredient: number;
  };
}

export const appInitialState: AppState = {
  auth: {
    loading: false,
    user: null,
    authError: null,
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
