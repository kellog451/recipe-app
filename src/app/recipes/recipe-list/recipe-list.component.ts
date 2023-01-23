import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/internal/Subscription';
import { DataStorageService } from 'src/app/services/data-storage.service';
import { RecipeService } from 'src/app/services/Recipe.service';
import { LoadingSpinnerComponent } from 'src/app/shared/loading-spinner';
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
  constructor(
    private recipeService: RecipeService,
    private dataStorageService: DataStorageService,
    private route: Router
  ) {}

  ngOnInit() {
    if (this.recipes.length === 0) {
      this.loading = true;
      this.dataStorageService.fetchRecipes().subscribe({
        next: () => {
          this.loading = false;
        },
        error: () => {
          this.loading = false;
        },
      });
    }
    this.subscription = this.recipeService.recipesChanged.subscribe(
      (recipes: Recipe[]) => {
        this.recipes = recipes;
      }
    );
    this.recipes = this.recipeService.getRecipes();
  }

  addNewRecipe() {
    this.route.navigate(['/recipes', 'add']);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
