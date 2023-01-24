import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { map, switchMap, take, tap } from 'rxjs';
import { of } from 'rxjs/internal/observable/of';
import { Recipe } from '../models/recipe.model';
import {
  RecipeActions,
  recipeActionTypes,
} from '../redux/actions/recipe.actions';
import { AppState } from '../redux/store/initial.state';

@Injectable({
  providedIn: 'root',
})
export class RecipeResolverService implements Resolve<Recipe[]> {
  baseUrl =
    'https://ng-recipe-app-bf25b-default-rtdb.firebaseio.com/recipes.json';
  constructor(
    private store: Store<AppState>,
    private actions$: Actions,
    private http: HttpClient
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.store.select('recipes').pipe(
      take(1),
      map((state) => state.recipeList),
      switchMap((recipes) => {
        if (recipes.length === 0) {
          return this.actions$.pipe(
            ofType(recipeActionTypes.FETCH_RECIPES_REQUEST),
            switchMap(() => {
              return this.http
                .get<Recipe[]>(this.baseUrl)
                .pipe(
                  tap((recipes) =>
                    this.store.dispatch(
                      RecipeActions.setRecipes({ recipePayload: recipes })
                    )
                  )
                );
            })
          );
        } else return of(recipes);
      })
    );
  }
}
