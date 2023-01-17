import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { take, tap, exhaustMap } from 'rxjs';
import { Recipe } from '../models/recipe.model';
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
    private authService: AuthService
  ) {}

  saveRecipes() {
    const recipes = this.recipeService.getRecipes();
    this.http.put(this.baseUrl, recipes).subscribe((response) => {
      console.log('Save ---->', response);
    });
  }

  fetchRecipes() {
    return this.authService.user.pipe(
      take(1),
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
