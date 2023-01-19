import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { map, Subscription } from 'rxjs';
import { LogoutUser } from '../redux/actions/auth.action';
import { AppState } from '../redux/store/initial.state';
import { DataStorageService } from '../services/data-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  userSubscription: Subscription;
  isAuthenticated = false;

  constructor(
    private dataStorageService: DataStorageService,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.userSubscription = this.store
      .select('auth')
      .pipe(map((state) => state.user))
      .subscribe({
        next: (user) => {
          this.isAuthenticated = !!user;
          console.log('----------', this.isAuthenticated);
          console.log('----------', user);
        },
        error: (error) => {},
      });
  }

  saveData() {
    this.dataStorageService.saveRecipes();
  }

  fetchData() {
    this.dataStorageService.fetchRecipes().subscribe();
  }

  logout() {
    // this.authService.logout();
    this.store.dispatch(new LogoutUser());
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }
}
