import { query } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { RecipeService } from 'src/app/services/Recipe.service';

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
    private recipeService: RecipeService,
    private activeRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activeRoute.params.subscribe((params: Params) => {
      this.recipe = this.recipeService
        .getRecipes()
        .find((recipe) => recipe.id === +params['id']);
    });
  }

  editRecipe() {
    this.router.navigate(['edit'], {
      queryParams: { editing: true },
      relativeTo: this.activeRoute,
    });
  }

  deleteRecipe() {
    this.recipeService.deleteRecipe(this.recipe.id);
    this.router.navigate(['recipes']);
  }
}
