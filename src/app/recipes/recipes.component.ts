import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../services/Recipe.service';
import { Recipe } from '../models/recipe.model';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css'],
})
export class RecipesComponent implements OnInit {
  selectedRecipe: Recipe;
  constructor(private recipeService: RecipeService) {}

  ngOnInit() {
    this.recipeService.selectedRecipe.subscribe((value: Recipe) => {
      this.selectedRecipe = value;
    });
  }
}
