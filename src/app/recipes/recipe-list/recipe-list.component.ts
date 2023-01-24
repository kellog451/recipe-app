import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, Subscription } from 'rxjs';
import { AppState } from 'src/app/redux/store/initial.state';
import { Recipe } from '../../models/recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css'],
})
export class RecipeListComponent implements OnInit, OnDestroy {
  recipes: Recipe[] = [];
  loading = false;
  subscription: Subscription;
  constructor(private route: Router, private store: Store<AppState>) {}

  ngOnInit() {
    this.subscription = this.store
      .select('recipes')
      .pipe(map((state) => state.recipeList))
      .subscribe({
        next: (recipesResponse) => (this.recipes = recipesResponse),
      });
  }

  addNewRecipe() {
    this.route.navigate(['/recipes', 'add']);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
