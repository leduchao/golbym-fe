import { HttpInterceptorFn } from '@angular/common/http';
import { AuthSerrvice } from './auth.service';
import { inject } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { JwtPayload } from '../interfaces/jwt-payload';

export const interceptorInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthSerrvice);

  const token = authService.getAccessToken();

  if (token) {
    const decoded = jwtDecode<JwtPayload>(token);

    const current = Math.floor(Date.now()) / 1000;

    if (decoded.exp <= current) {
      authService.logout();
      location.reload();
    } else {
      const reqClone = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });

      return next(reqClone);
    }
  }

  return next(req);
};
