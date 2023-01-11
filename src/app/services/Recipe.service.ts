import { EventEmitter, Injectable } from '@angular/core';
import { Recipe } from '../recipes/recipe.model';

@Injectable({ providedIn: 'root' })
export class RecipeService {
  recipes: Recipe[] = [
    new Recipe(
      1,
      'Shawarma Recipe',
      'How to make Shawarma',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjIAfLqeImOPh_UFUGIZhcptAlYetBx9_djw&usqp=CAU',
      [
        'Put half the chicken into a food processor and whizz for 30 seconds',
        'Whizz again until smooth and well combined, then add the remaining chickpeas',
        'Spoon the mixture into a bowl and chill in the fridge for 30 mins.',
        'Add in the 1 crushed garlic clove, 1 tsp salt, 3 tbsp extra-virgin olive oil',
        'Wrap in the chapati and serve warm with flavor',
      ]
    ),
    new Recipe(
      2,
      'Pizza Recipe',
      'Best Pizza recipe',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR16SSyfotY1VzHopOLuJRtlMZVh7cD3WT8ew&usqp=CAU',
      [
        'Put half the chicken into a food processor and whizz for 30 seconds',
        'Whizz again until smooth and well combined, then add the remaining chickpeas',
        'Spoon the mixture into a bowl and chill in the fridge for 30 mins.',
        'Add in the 1 crushed garlic clove, 1 tsp salt, 3 tbsp extra-virgin olive oil',
        'Wrap in the chapati and serve warm with flavor',
      ]
    ),
    new Recipe(
      3,
      'Steak Recipe',
      'How to make the perfect beef steak',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTa0REoOOVzR74S2eapBLR0uWFLl_hxH2Nt5w&usqp=CAU',
      [
        'Put half the chicken into a food processor and whizz for 30 seconds',
        'Whizz again until smooth and well combined, then add the remaining chickpeas',
        'Spoon the mixture into a bowl and chill in the fridge for 30 mins.',
        'Add in the 1 crushed garlic clove, 1 tsp salt, 3 tbsp extra-virgin olive oil',
        'Wrap in the chapati and serve warm with flavor',
      ]
    ),
    new Recipe(
      4,
      'Chappati Recipe',
      'How to prepare soft, delicious Chappati',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDza-jxbDhN7qDFvN4Zlw3zBoTaRVRKDOIyA&usqp=CAU',
      [
        'Put half the chicken into a food processor and whizz for 30 seconds',
        'Whizz again until smooth and well combined, then add the remaining chickpeas',
        'Spoon the mixture into a bowl and chill in the fridge for 30 mins.',
        'Add in the 1 crushed garlic clove, 1 tsp salt, 3 tbsp extra-virgin olive oil',
        'Wrap in the chapati and serve warm with flavor',
      ]
    ),
  ];

  selectedRecipe = new EventEmitter<Recipe>();

  getRecipes() {
    return this.recipes.slice();
  }
}
