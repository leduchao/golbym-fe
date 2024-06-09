import { Component, Input, OnInit, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthSerrvice } from '../../services/auth.service';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss',
})
export class AuthComponent implements OnInit {
  userName = '';
  isAuthenticated = false;

  private authService = inject(AuthSerrvice);

  ngOnInit(): void {
    if (this.authService.getAccessToken()) {
      this.isAuthenticated = true;
      this.userName = this.authService.getUserName();
    }
  }

  logOut() {
    this.authService.logout();
    location.reload();
  }
}
