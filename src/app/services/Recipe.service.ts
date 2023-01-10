import { EventEmitter, Injectable } from '@angular/core';
import { Recipe } from '../recipes/recipe.model';

@Injectable({ providedIn: 'root' })
export class RecipeService {
  recipes: Recipe[] = [
    new Recipe(
      1,
      'Shawarma Recipe',
      'How to make Shawarma',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjIAfLqeImOPh_UFUGIZhcptAlYetBx9_djw&usqp=CAU'
    ),
    new Recipe(
      2,
      'Pizza Recipe',
      'Best Pizza recipe',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR16SSyfotY1VzHopOLuJRtlMZVh7cD3WT8ew&usqp=CAU'
    ),
    new Recipe(
      3,
      'Steak Recipe',
      'How to make the perfect beef steak',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTa0REoOOVzR74S2eapBLR0uWFLl_hxH2Nt5w&usqp=CAU'
    ),
    new Recipe(
      4,
      'Chappati Recipe',
      'How to prepare soft, delicious Chappati',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDza-jxbDhN7qDFvN4Zlw3zBoTaRVRKDOIyA&usqp=CAU'
    ),
  ];

  selectedRecipe = new EventEmitter<Recipe>();

  getRecipes() {
    return this.recipes.slice();
  }
}
