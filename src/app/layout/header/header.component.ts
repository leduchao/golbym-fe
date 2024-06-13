import { Component, OnInit, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthComponent } from '../../components/auth/auth.component';
import { AuthSerrvice } from '../../services/auth.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { KeyedWrite } from '@angular/compiler';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, AuthComponent, ReactiveFormsModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  roles: string = '';

  private authService = inject(AuthSerrvice);
  private router = inject(Router);

  searchForm = new FormGroup({
    searchInput: new FormControl(''),
  });

  ngOnInit(): void {
    this.roles = this.authService.getUserRoles();
  }

  searchPostSubmit() {
    const keyword = this.searchForm.value.searchInput;
    this.router.navigate(['/posts/search/'], {
      queryParams: { keyword: keyword },
    });
  }
}
