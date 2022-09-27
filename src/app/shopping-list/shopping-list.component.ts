import { Component, OnInit } from '@angular/core';
import { ingredients } from '../shared/ingredients.model';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements OnInit {
  ingredientsList: ingredients[] = [
    new ingredients('Wheat Flour', 3),
    new ingredients('Peas', 1),
    new ingredients('Garlic', 1),
    new ingredients('Baking Powder', 1),
  ];

  constructor() {}

  ngOnInit(): void {}

  addIngredient(item: ingredients) {
    this.ingredientsList.push(item);
  }
}
