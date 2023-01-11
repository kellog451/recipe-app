import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ShoppingListService } from '../services/ShoppingList.service';
import { Ingredients } from '../shared/ingredients.model';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements OnInit {
  ingredientsList: Ingredients[] = [];
  subscription: Subscription;

  constructor(private slService: ShoppingListService) {}

  ngOnInit(): void {
    this.ingredientsList = this.slService.getIngredients();
    this.subscription = this.slService.ingredientsChanged.subscribe(
      (ingredients) => {
        this.ingredientsList = ingredients;
      }
    );
  }

  addIngredient(item: Ingredients) {
    this.slService.addIngredient(item);
  }

  onEditItem(index: number) {
    this.slService.startedEditing.next(index);
  }
}
