import { Component, OnInit, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthComponent } from '../../components/auth/auth.component';
import { AuthSerrvice } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, AuthComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  roles: string = '';
  private authService = inject(AuthSerrvice);

  ngOnInit(): void {
    this.roles = this.authService.getUserRoles();
  }
}
