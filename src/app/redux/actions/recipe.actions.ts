import { createAction, props } from '@ngrx/store';
import { Recipe } from 'src/app/models/recipe.model';

export const recipeActionTypes = {
  SET_RECIPES: '[Recipes] SET_RECIPES',

  FETCH_RECIPES_REQUEST: '[Recipes] FETCH_RECIPES_REQUEST',
  FETCH_RECIPES_SUCCESS: '[Recipes] FETCH_RECIPES_SUCCESS',
  FETCH_RECIPES_ERROR: '[Recipes] FETCH_RECIPES_ERROR',

  SAVE_RECIPES_REQUEST: '[Recipes] SAVE_RECIPES_REQUEST',
  SAVE_RECIPES_SUCCESS: '[Recipes] SAVE_RECIPES_SUCCESS',
  SAVE_RECIPES_ERROR: '[Recipes] SAVE_RECIPES_ERROR',

  ADD_RECIPE_REQUEST: '[Recipes] ADD_RECIPE_REQUEST',
  ADD_RECIPE_SUCCESS: '[Recipes] ADD_RECIPE_SUCCESS',
  ADD_RECIPE_ERROR: '[Recipes] ADD_RECIPE_ERROR',

  UPDATE_RECIPE_REQUEST: '[Recipes] UPDATE_RECIPE_REQUEST',
  UPDATE_RECIPE_SUCCESS: '[Recipes] UPDATE_RECIPE_SUCCESS',
  UPDATE_RECIPE_ERROR: '[Recipes] UPDATE_RECIPE_ERROR',

  DELETE_RECIPE_REQUEST: '[Recipes] DELETE_RECIPE_REQUEST',
  DELETE_RECIPE_SUCCESS: '[Recipes] DELETE_RECIPE_SUCCESS',
  DELETE_RECIPE_ERROR: '[Recipes] DELETE_RECIPE_ERROR',
};

export const RecipeActions = {
  setRecipes: createAction(
    recipeActionTypes.SET_RECIPES,
    props<{ recipePayload: Recipe[] }>()
  ),

  fetchRecipes: createAction(recipeActionTypes.FETCH_RECIPES_REQUEST),

  saveRecipe: createAction(recipeActionTypes.SAVE_RECIPES_REQUEST),

  addRecipe: createAction(
    recipeActionTypes.ADD_RECIPE_REQUEST,
    props<{ recipe: Recipe }>()
  ),

  updateRecipe: createAction(
    recipeActionTypes.UPDATE_RECIPE_REQUEST,
    props<{ id: number; recipe: Recipe }>()
  ),

  deleteRecipe: createAction(
    recipeActionTypes.DELETE_RECIPE_REQUEST,
    props<{ id: number }>()
  ),
};
