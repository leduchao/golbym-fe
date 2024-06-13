import { Component, inject } from '@angular/core';
import { LoginRequest } from '../../interfaces/login-request';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  HttpClient,
  HttpErrorResponse,
  HttpResponse,
} from '@angular/common/http';
import { Router } from '@angular/router';
import { LoginResponse } from '../../interfaces/login-response';
import { environment } from '../../../environments/environment.development';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss',
})
export class SignInComponent {
  private url = `${environment.AUTH_URL}/login`;

  private httpClient = inject(HttpClient);
  private router = inject(Router);

  isValidLogin = true;

  validatorError = {
    userName: {
      required: 'Bạn cần nhập tên người dùng!',
      minLength: 'Tên người dùng cần có ít nhất 3 ký tự!',
    },
    password: {
      required: 'Bạn cần nhập mật khẩu!',
      minLength: 'Mật khẩu cần có ít nhất 6 ký tự!',
    },
  };

  loginForm = new FormGroup({
    userName: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
  });

  submitLogin() {
    if (!this.loginForm.invalid) {
      this.isValidLogin = true;

      const loginRequest: LoginRequest = {
        userName: this.loginForm.value.userName ?? 'username',
        password: this.loginForm.value.password ?? 'password',
      };

      this.httpClient
        .post(this.url, loginRequest, {
          observe: 'response',
        })
        .subscribe({
          next: (data: HttpResponse<any>) => {
            const loginResponse: LoginResponse = {
              result: data.body.result,
              token: data.body.token,
            };

            localStorage.setItem('accessToken', loginResponse.token);
            alert('Đăng nhập thành công!');

            this.router.navigateByUrl('').then(() => {
              location.reload();
            });
          },
          error: (error: HttpErrorResponse) => {
            alert(error.error.result.errors[0].description);
            console.log(error.error.result.errors);
            this.loginForm.reset();
          },
        });
    } else {
      this.isValidLogin = false;
      // alert('Thông tin đăng nhập không hợp lệ!');
    }
  }
}
