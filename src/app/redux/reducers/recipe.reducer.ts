import { createReducer, on, State } from '@ngrx/store';
import { RecipeActions } from '../actions/recipe.actions';
import { appInitialState } from '../store/initial.state';

export const recipeReducer = createReducer(
  appInitialState.recipes,

  on(RecipeActions.setRecipes, (state, { recipePayload }) => ({
    ...state,
    recipeList: recipePayload,
  })),

  on(RecipeActions.addRecipe, (state, { recipe }) => ({
    ...state,
    recipeList: [...state.recipeList, recipe],
  })),

  on(RecipeActions.updateRecipe, (state, { id, recipe }) => {
    const recipeIndex = state.recipeList.findIndex(
      (recipe) => recipe.id === id
    );
    const updatedRecipes = [...state.recipeList];

    if (recipeIndex) updatedRecipes[recipeIndex] = recipe;
    return {
      ...state,
      recipeList: updatedRecipes,
    };
  }),

  on(RecipeActions.deleteRecipe, (state, { id }) => ({
    ...state,
    recipeList: state.recipeList.filter((recipe) => recipe.id !== id),
  }))
);
