import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map } from 'rxjs';
import { RecipeActions } from 'src/app/redux/actions/recipe.actions';
import { AppState } from 'src/app/redux/store/initial.state';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.css'],
})
export class RecipeDetailsComponent implements OnInit {
  recipe: {
    id: number;
    name: string;
    description: string;
    imageUrl: string;
    steps: string[];
  };
  constructor(
    private activeRoute: ActivatedRoute,
    private router: Router,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.activeRoute.params.subscribe((params: Params) => {
      this.store
        .select('recipes')
        .pipe(
          map((recipes) => {
            return recipes.recipeList.find(
              (recipe) => recipe.id === +params['id']
            );
          })
        )
        .subscribe({ next: (recipe) => (this.recipe = recipe) });
    });
  }

  editRecipe() {
    this.router.navigate(['edit'], {
      queryParams: { editing: true },
      relativeTo: this.activeRoute,
    });
  }

  deleteRecipe() {
    this.store.dispatch(RecipeActions.deleteRecipe({ id: this.recipe.id }));
    this.router.navigate(['recipes']);
  }
}
