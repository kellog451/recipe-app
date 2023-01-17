import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthResponseData, AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit {
  isLoggingIn = true;
  isLoading = false;
  error: string = null;
  authForm = new FormGroup({
    email: new FormControl(null, [Validators.email, Validators.required]),
    password: new FormControl(null, [
      Validators.required,
      Validators.minLength(6),
    ]),
  });
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  switchAuthMode() {
    this.isLoggingIn = !this.isLoggingIn;
  }

  submitForm() {
    let authObservable: Observable<AuthResponseData>;
    this.isLoading = true;
    const email = this.authForm.value['email'];
    const password = this.authForm.value['password'];
    console.log('form --->', this.authForm);
    if (this.isLoggingIn) {
      authObservable = this.authService.signIn(email, password);
    } else {
      authObservable = this.authService.signUp(email, password);
    }

    authObservable.subscribe({
      next: (response) => {
        this.isLoading = false;
        console.log('Response', response);
        this.router.navigate(['/recipes']);
        // this.authForm.reset();
      },
      error: (error) => {
        this.isLoading = false;
        this.error = error;
      },
    });
  }

  handleError() {
    this.error = null;
  }
}
