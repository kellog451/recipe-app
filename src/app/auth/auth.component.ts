import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import {
  ClearError,
  LoginRequest,
  SignUpRequest,
} from '../redux/actions/auth.action';
import { AppState } from '../redux/store/initial.state';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit, OnDestroy {
  isLoggingIn = true;
  storeSubscription: Subscription;
  isLoading = false;
  error: string = null;
  authForm = new FormGroup({
    email: new FormControl(null, [Validators.email, Validators.required]),
    password: new FormControl(null, [
      Validators.required,
      Validators.minLength(6),
    ]),
  });
  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.storeSubscription = this.store.select('auth').subscribe({
      next: (state) => {
        this.isLoading = state.loading;
        this.error = state.authError;
      },
    });
  }

  switchAuthMode() {
    this.isLoggingIn = !this.isLoggingIn;
  }

  submitForm() {
    this.isLoading = true;
    const email = this.authForm.value['email'];
    const password = this.authForm.value['password'];
    if (this.isLoggingIn) {
      this.store.dispatch(new LoginRequest({ email, password }));
    } else {
      this.store.dispatch(new SignUpRequest({ email, password }));
    }
  }

  handleError() {
    // this.error = null;
    this.store.dispatch(new ClearError());
  }

  ngOnDestroy(): void {
    this.storeSubscription.unsubscribe();
  }
}
