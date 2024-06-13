import { Component, inject } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
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

  isValidForm = true;

  validatorError = {
    userName: {
      required: 'Bạn cần nhập tên người dùng!',
      minLength: 'Tên người dùng cần có ít nhất 3 ký tự!',
    },
    password: {
      required: 'Bạn cần nhập mật khẩu!',
      minLength: 'Mật khẩu cần có ít nhất 6 ký tự!',
      missMatchPassword: 'Mật khẩu không trùng khớp!',
    },
    email: {
      required: 'Bạn cần nhập email!',
      invalidEmail: 'Email không đúng định dạng (example@email.com)',
    },
  };

  signUpForm = new FormGroup(
    {
      userName: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
      confirmPassword: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
    },
    { validators: this.passwordConfirming }
  );

  submitSignUp() {
    const signUpRequest: SignUpRequest = {
      userName: this.signUpForm.value.userName ?? 'username',
      email: this.signUpForm.value.email ?? 'password',
      password: this.signUpForm.value.password ?? 'password',
    };

    if (this.signUpForm.valid) {
      this.isValidForm = true;

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
    } else {
      console.log(this.signUpForm.errors);

      this.isValidForm = false;
    }
  }

  passwordConfirming(
    c: AbstractControl
  ): { passwordsMismatch: boolean } | null {
    if (c.get('password')?.value !== c.get('confirmPassword')?.value) {
      return { passwordsMismatch: true };
    }

    return null;
  }
}
