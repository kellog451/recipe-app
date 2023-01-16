import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs';
import { Recipe } from '../recipes/recipe.model';
import { RecipeService } from './Recipe.service';

@Injectable({
  providedIn: 'root',
})
export class DataStorageService {
  baseUrl =
    'https://ng-recipe-app-bf25b-default-rtdb.firebaseio.com/recipes.json';
  constructor(private http: HttpClient, private recipeService: RecipeService) {}

  saveRecipes() {
    const recipes = this.recipeService.getRecipes();
    this.http.put(this.baseUrl, recipes).subscribe((response) => {
      console.log('Save ---->', response);
    });
  }

  fetchRecipes() {
    return this.http.get<Recipe[]>(this.baseUrl).pipe(
      tap((recipes) => {
        this.recipeService.setRecipes(recipes);
      })
    );
  }
}
