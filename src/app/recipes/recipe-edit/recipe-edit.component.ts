import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map } from 'rxjs';
import { RecipeActions } from 'src/app/redux/actions/recipe.actions';
import { AppState } from 'src/app/redux/store/initial.state';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css'],
})
export class RecipeEditComponent implements OnInit {
  recipe: {
    id: number;
    name: string;
    description: string;
    imageUrl: string;
    steps: string[];
  };
  recipeForm: FormGroup;
  isEditing = false;
  constructor(
    private activeRoute: ActivatedRoute,
    private router: Router,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.recipeForm = new FormGroup({
      name: new FormControl(null, Validators.required),
      description: new FormControl(null, Validators.required),
      imageUrl: new FormControl(null, Validators.required),
      steps: new FormArray([]),
    });
    this.activeRoute.params.subscribe((params: Params) => {
      this.store
        .select('recipes')
        .pipe(
          map((state) =>
            state.recipeList.find((recipe) => recipe.id === +params['id'])
          )
        )
        .subscribe({
          next: (recipe) => {
            this.recipe = recipe;
          },
        });
      this.isEditing = params['id'] != null;
      this.initializeForm();
    });
  }

  initializeForm() {
    if (this.isEditing) {
      this.recipeForm = new FormGroup({
        name: new FormControl(this.recipe.name, Validators.required),
        description: new FormControl(
          this.recipe.description,
          Validators.required
        ),
        imageUrl: new FormControl(this.recipe.imageUrl, Validators.required),
        steps: new FormArray(
          this.recipe.steps.map(
            (step) => new FormControl(step, Validators.required)
          )
        ),
      });
      console.log(this.recipeForm);
    }
  }

  getRecipeSteps() {
    return (<FormArray>this.recipeForm.get('steps')).controls;
  }

  addRecipeStep() {
    const control = new FormControl(null, Validators.required);
    (<FormArray>this.recipeForm.get('steps')).push(control);
  }

  onDeleteStep(index: number) {
    (<FormArray>this.recipeForm.get('steps')).removeAt(index);
  }

  deleteRecipeStep() {
    (<FormArray>this.recipeForm.get('steps')).clear();
  }

  submitForm() {
    if (this.isEditing)
      this.store.dispatch(
        RecipeActions.updateRecipe({
          id: this.recipe.id,
          recipe: {
            id: this.recipe.id,
            ...this.recipeForm.value,
          },
        })
      );
    else
      this.store.dispatch(
        RecipeActions.addRecipe({
          recipe: {
            id: Math.floor(Math.random() * 1000),
            ...this.recipeForm.value,
          },
        })
      );

    this.cancelAction();
  }

  cancelAction() {
    this.router.navigate(['../'], { relativeTo: this.activeRoute });
  }
}
