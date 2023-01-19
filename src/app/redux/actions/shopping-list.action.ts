import { Action } from '@ngrx/store';
import { Ingredients } from 'src/app/models/ingredients.model';

export const shoppingListActionsTypes = {
  ADD_INGREDIENT: '[ShoppingList] ADD_INGREDIENT',
  UPDATE_INGREDIENT: '[ShoppingList] UPDATE_INGREDIENT',
  DELETE_INGREDIENT: '[ShoppingList] DELETE_INGREDIENT',
  START_EDIT_INGREDIENT: '[ShoppingList] START_EDIT_INGREDIENT',
  STOP_EDIT_INGREDIENT: '[ShoppingList] STOP_EDIT_INGREDIENT',
};

export class AddIngredient implements Action {
  readonly type: string = shoppingListActionsTypes.ADD_INGREDIENT;

  constructor(public payload: Ingredients) {
    console.log('Add Action dispatched ----------');
  }
}

export class UpdateIngredient implements Action {
  readonly type: string = shoppingListActionsTypes.UPDATE_INGREDIENT;

  constructor(public payload: Ingredients) {
    console.log('Update Action dispatched ----------');
  }
}

export class DeleteIngredient implements Action {
  readonly type: string = shoppingListActionsTypes.DELETE_INGREDIENT;
}

export class StartEditIngredient implements Action {
  readonly type: string = shoppingListActionsTypes.START_EDIT_INGREDIENT;

  constructor(public payload: number) {
    console.log('Start Edit Action dispatched ----------');
  }
}
export class StopEditIngredient implements Action {
  readonly type: string = shoppingListActionsTypes.STOP_EDIT_INGREDIENT;
}

// export type ShoppingListActions =
//   | AddIngredient
//   | UpdateIngredient
//   | DeleteIngredient
//   | StartEditIngredient
//   | StopEditIngredient;
