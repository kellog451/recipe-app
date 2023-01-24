import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { switchMap, map, withLatestFrom } from 'rxjs';
import { of } from 'rxjs/internal/observable/of';
import { Recipe } from 'src/app/models/recipe.model';
import { RecipeActions, recipeActionTypes } from '../actions/recipe.actions';
import { AppState } from '../store/initial.state';

@Injectable()
export class RecipeEffects {
  baseUrl =
    'https://ng-recipe-app-bf25b-default-rtdb.firebaseio.com/recipes.json';
  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private store: Store<AppState>
  ) {}

  fetchRecipes$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(recipeActionTypes.FETCH_RECIPES_REQUEST),
      switchMap(() => {
        return this.http.get<Recipe[]>(this.baseUrl);
      }),
      map((recipes) => RecipeActions.setRecipes({ recipePayload: recipes }))
    );
  });

  saveRecipes$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(recipeActionTypes.SAVE_RECIPES_REQUEST),
        withLatestFrom(this.store.select('recipes')),
        switchMap(([action, state]) => {
          return this.http.put(this.baseUrl, state.recipeList);
        })
      );
    },
    { dispatch: false }
  );
}
