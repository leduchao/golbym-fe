import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { jwtDecode } from 'jwt-decode';
import { JwtPayload } from '../interfaces/jwt-payload';

@Injectable({
  providedIn: 'root',
})
export class AuthSerrvice {
  private httpClient: HttpClient = inject(HttpClient);

  getUserInfo(userName: string) {
    return this.httpClient.get<any>(
      `${environment.AUTH_URL}/user-info/${userName}`
    );
  }

  getAccessToken() {
    return localStorage.getItem('accessToken');
  }

  getUserRoles(): string {
    const token = this.getAccessToken();

    if (!token) return 'no role';

    const decoded = jwtDecode<JwtPayload>(token);
    // console.log(decoded);

    return decoded[
      'http://schemas.microsoft.com/ws/2008/06/identity/claims/role'
    ];
  }

  getUserName(): string {
    const token = this.getAccessToken();

    if (!token) return 'no name';

    const decoded = jwtDecode<JwtPayload>(token);

    return decoded.name;
  }

  logout() {
    localStorage.removeItem('accessToken');
  }
}
