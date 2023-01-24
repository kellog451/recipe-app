import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { map, Subscription } from 'rxjs';
import { LogoutUser } from '../redux/actions/auth.action';
import { RecipeActions } from '../redux/actions/recipe.actions';
import { AppState } from '../redux/store/initial.state';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  userSubscription: Subscription;
  isAuthenticated = false;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.userSubscription = this.store
      .select('auth')
      .pipe(map((state) => state.user))
      .subscribe({
        next: (user) => {
          this.isAuthenticated = !!user;
        },
        error: (error) => {},
      });
  }

  saveData() {
    this.store.dispatch(RecipeActions.saveRecipe());
  }

  fetchData() {
    this.store.dispatch(RecipeActions.fetchRecipes());
  }

  logout() {
    this.store.dispatch(new LogoutUser());
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }
}
