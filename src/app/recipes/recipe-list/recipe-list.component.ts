import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css'],
})
export class RecipeListComponent implements OnInit {
  @Output() selectedRecipeObject = new EventEmitter<Recipe>();
  recipes: Recipe[] = [
    new Recipe(
      'Shawarma Recipe',
      'recipe for Shawarma',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjIAfLqeImOPh_UFUGIZhcptAlYetBx9_djw&usqp=CAU'
    ),
    new Recipe(
      'Pizza Recipe',
      'recipe for sddasda',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjIAfLqeImOPh_UFUGIZhcptAlYetBx9_djw&usqp=CAU'
    ),
    new Recipe(
      'Beef Recipe',
      'recipe for asdasds',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjIAfLqeImOPh_UFUGIZhcptAlYetBx9_djw&usqp=CAU'
    ),
    new Recipe(
      'Chappati Recipe',
      'recipe for sdasds',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjIAfLqeImOPh_UFUGIZhcptAlYetBx9_djw&usqp=CAU'
    ),
  ];

  constructor() {
    console.log('------------> ', this.recipes);
  }

  setSelectedRecipe(recipe: Recipe) {
    this.selectedRecipeObject.emit(recipe);
  }

  ngOnInit(): void {}
}
