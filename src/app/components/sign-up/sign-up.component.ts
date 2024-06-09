import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { environment } from '../../../environments/environment.development';
import {
  HttpClient,
  HttpErrorResponse,
  HttpResponse,
} from '@angular/common/http';
import { Router } from '@angular/router';
import { SignUpRequest } from '../../interfaces/sign-up-request';
import { IdentityResult } from '../../interfaces/identity-result';
import { IdentityError } from '../../interfaces/identity-error';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss',
})
export class SignUpComponent {
  private url = `${environment.AUTH_URL}/signup`;

  private httpClient = inject(HttpClient);
  private router = inject(Router);

  signUpForm = new FormGroup({
    userName: new FormControl(),
    email: new FormControl(),
    password: new FormControl(),
  });

  submitSignUp() {
    const signUpRequest: SignUpRequest = {
      userName: this.signUpForm.value.userName,
      email: this.signUpForm.value.email,
      password: this.signUpForm.value.password,
    };

    this.httpClient
      .post(this.url, signUpRequest, {
        observe: 'response',
      })
      .subscribe({
        next: (data: HttpResponse<any>) => {
          const signUpResponse: IdentityResult = {
            success: data.body.succeeded,
            errors: data.body.errors,
          };

          alert('Đăng ký thành công!');

          this.router.navigateByUrl('/sign-in').then(() => {
            location.reload();
          });
        },
        error: (err: HttpErrorResponse) => {
          alert(err.error.errors[0].description);

          console.log(err.error.errors);
          this.signUpForm.reset();
        },
      });
  }
}
