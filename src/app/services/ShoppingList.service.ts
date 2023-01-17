import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/internal/Subject';
import { Ingredients } from '../models/ingredients.model';

@Injectable({ providedIn: 'root' })
export class ShoppingListService {
  ingredientsChanged = new Subject<Ingredients[]>();
  startedEditing = new Subject<number>();
  ingredients: Ingredients[] = [
    new Ingredients('Wheat Flour', 3),
    new Ingredients('Peas', 1),
    new Ingredients('Garlic', 1),
    new Ingredients('Baking Powder', 1),
  ];

  getIngredients() {
    return this.ingredients.slice();
  }

  getIngredient(index: number) {
    return this.ingredients[index];
  }

  addIngredient(item: Ingredients) {
    this.ingredients.push(item);
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  updateIngredient(index: number, item: Ingredients) {
    this.ingredients[index] = item;
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  deleteIngredient(index: number) {
    this.ingredients.splice(index, 1);
    this.ingredientsChanged.next(this.ingredients.slice());
  }
}
