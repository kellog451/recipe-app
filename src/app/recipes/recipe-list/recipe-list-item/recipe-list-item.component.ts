import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Recipe } from '../../recipe.model';
import { RecipesComponent } from '../../recipes.component';

@Component({
  selector: 'app-recipe-list-item',
  templateUrl: './recipe-list-item.component.html',
  styleUrls: ['./recipe-list-item.component.css'],
})
export class RecipeListItemComponent implements OnInit {
  @Input() recipe: { name: string; description: string; imageUrl: string };
  @Output() selectedRecipe = new EventEmitter<void>();
  constructor() {}

  selectRecipe(option) {
    this.selectedRecipe.emit(option);
  }

  ngOnInit(): void {}
}
