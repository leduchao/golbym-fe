import { Component, OnInit, inject } from '@angular/core';
import { PostListComponent } from '../post-list/post-list.component';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-search-list',
  standalone: true,
  imports: [PostListComponent],
  templateUrl: './search-list.component.html',
  styleUrl: './search-list.component.scss',
})
export class SearchListComponent implements OnInit {
  keyword = '';

  private route = inject(ActivatedRoute);

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.keyword = String(params['keyword']);
      console.log(this.keyword);
    });
  }
}
