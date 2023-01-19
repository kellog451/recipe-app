import { Ingredients } from 'src/app/models/ingredients.model';
import { shoppingListActionsTypes } from '../actions/shopping-list.action';
import { appInitialState } from '../store/initial.state';

export interface ShoppingState {
  ingredients: Ingredients[];
  selectedIngredient: Ingredients;
  indexOfSelectedIngredient: number;
}

export function shoppingListReducer(
  state = appInitialState.shoppingList,
  action: { type: string; payload?: any }
) {
  console.log('state', state);
  console.log('action', action);
  switch (action.type) {
    case shoppingListActionsTypes.ADD_INGREDIENT:
      return { ...state, ingredients: [...state.ingredients, action.payload] };

    case shoppingListActionsTypes.UPDATE_INGREDIENT: {
      const newState = {
        ...state,
        ingredients: [...state.ingredients],
      };

      newState.ingredients[state.indexOfSelectedIngredient] = action.payload;

      return newState;
    }

    case shoppingListActionsTypes.DELETE_INGREDIENT:
      return {
        ...state,
        ingredients: state.ingredients.filter(
          (item, index) => index !== state.indexOfSelectedIngredient
        ),
      };

    case shoppingListActionsTypes.START_EDIT_INGREDIENT:
      return {
        ...state,
        selectedIngredient: { ...state.ingredients[action.payload] },
        indexOfSelectedIngredient: action.payload,
      };

    case shoppingListActionsTypes.STOP_EDIT_INGREDIENT:
      return {
        ...state,
        selectedIngredient: null,
        indexOfSelectedIngredient: -1,
      };

    default:
      return state;
  }
}
