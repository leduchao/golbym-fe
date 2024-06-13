import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  inject,
} from '@angular/core';
import { Post } from '../../interfaces/post';
import { RouterModule } from '@angular/router';
import { PostService } from '../../services/post.service';
import { PagedResult } from '../../interfaces/paged-result';
import { PostComponent } from '../post/post.component';

@Component({
  selector: 'app-post-list',
  standalone: true,
  imports: [RouterModule, PostComponent],
  templateUrl: './post-list.component.html',
  styleUrl: './post-list.component.scss',
})
export class PostListComponent implements OnInit, OnChanges {
  @Input() keyword: string = '';

  private numberPosts = 9;

  isLoaded = false;

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
    this.loadPosts(this.keyword, 1, this.numberPosts);
  }

  ngOnChanges(): void {
    this.loadPosts(this.keyword, 1, this.numberPosts);
  }

  loadPosts(keyword: string, page: number, numberPosts: number) {
    this.postService.getPosts(keyword, page, numberPosts).subscribe({
      next: (data: PagedResult<Post>) => {
        this.isLoaded = true;

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
    this.loadPosts(this.keyword, page, this.numberPosts);
  }
}
