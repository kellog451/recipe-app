import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { take, tap, exhaustMap, map } from 'rxjs';
import { Recipe } from '../models/recipe.model';
import { AppState } from '../redux/store/initial.state';
import { AuthService } from './auth.service';
import { RecipeService } from './Recipe.service';

@Injectable({
  providedIn: 'root',
})
export class DataStorageService {
  baseUrl =
    'https://ng-recipe-app-bf25b-default-rtdb.firebaseio.com/recipes.json';

  constructor(
    private http: HttpClient,
    private recipeService: RecipeService,
    private authService: AuthService,
    private store: Store<AppState>
  ) {}

  saveRecipes() {
    const recipes = this.recipeService.getRecipes();
    this.http.put(this.baseUrl, recipes).subscribe((response) => {
      console.log('Save ---->', response);
    });
  }

  fetchRecipes() {
    return this.store.select('auth').pipe(
      take(1),
      map((state) => state.user),
      exhaustMap((user) => {
        return this.http.get<Recipe[]>(this.baseUrl, {
          params: new HttpParams().set('auth', user.token),
        });
      }),
      tap((recipes) => {
        this.recipeService.setRecipes(recipes);
      })
    );
  }
}
