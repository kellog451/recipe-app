import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { RecipeService } from 'src/app/services/Recipe.service';

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
    private recipeService: RecipeService,
    private activeRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.recipeForm = new FormGroup({
      title: new FormControl(null),
      description: new FormControl(null),
      imageUrl: new FormControl(null),
      steps: new FormControl(null),
    });
    this.activeRoute.params.subscribe((params: Params) => {
      this.recipe = this.recipeService
        .getRecipes()
        .find((recipe) => recipe.id === +params['id']);
      this.isEditing = params['id'] != null;
    });
  }

  initializeForm() {
    if (this.isEditing) {
      this.recipeForm = new FormGroup({
        title: new FormControl(this.recipe.name),
        description: new FormControl(this.recipe.description),
        imageUrl: new FormControl(this.recipe.imageUrl),
        steps: new FormControl(this.recipe.steps),
      });
    }
  }
}
