import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Ingredients } from '../models/ingredients.model';
import { StartEditIngredient } from '../redux/actions/shopping-list.action';
import { ShoppingState } from '../redux/reducers/shopping-list.reducer';
import { AppState } from '../redux/store/initial.state';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements OnInit {
  ingredientsList: Observable<ShoppingState>;
  // subscription: Subscription;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.ingredientsList = this.store.select('shoppingList');
  }

  onEditItem(index: number) {
    this.store.dispatch(new StartEditIngredient(index));
  }
}
