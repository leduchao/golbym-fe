import { Component, OnInit, inject } from '@angular/core';
import { Post } from '../../interfaces/post';
import { RouterModule } from '@angular/router';
import { PostService } from '../../services/post.service';
import { HttpResponse } from '@angular/common/http';
import { AuthSerrvice } from '../../services/auth.service';
import { PagedResult } from '../../interfaces/paged-result';

@Component({
  selector: 'app-new-blogs',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './new-blogs.component.html',
  styleUrl: './new-blogs.component.scss',
})
export class NewBlogsComponent implements OnInit {
  // posts: Post[] = [];

  // private pageSize = 9;
  pages: number[] = [];

  pagedResult: PagedResult<Post> = {
    currentPage: 0,
    pageSize: 0,
    totalItems: 0,
    totalPages: 0,
    items: [],
  };

  private postService = inject(PostService);

  ngOnInit(): void {
    this.loadPosts();
  }

  loadPosts(page: number = 1) {
    // page = 3;
    this.postService.getAll(page).subscribe({
      next: (data: PagedResult<Post>) => {
        this.pagedResult = data;

        this.pages = Array.from(
          {
            length: this.pagedResult.totalPages,
          },
          (_, i) => i + 1
        );
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  gotoPage(page: number) {
    this.loadPosts(page);
  }

  // getPostById(id: string) {
  //   this.postService.getById(id).subscribe({
  //     next: (post) => {
  //       console.log(post);
  //     },
  //     error: (err) => {
  //       console.log(err);
  //     },
  //   });
  // }
}
