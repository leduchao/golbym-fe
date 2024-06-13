import { Component, OnInit, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PostService } from '../../services/post.service';
import { PagedResult } from '../../interfaces/paged-result';
import { Post } from '../../interfaces/post';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  private postService = inject(PostService);

  isLoaded = false;
  posts: Post[] = [];
  morePosts: Post[] = [];

  ngOnInit(): void {
    this.loadPosts(1, 4, this.posts);
    this.loadMorePosts(2, 4);
  }

  loadPosts(page: number, numberPosts: number, assignPosts: Post[]) {
    this.postService.getPosts('', page, numberPosts).subscribe({
      next: (data: PagedResult<Post>) => {
        this.isLoaded = true;

        // Clear the existing content of assignPosts
        assignPosts.splice(0, assignPosts.length);

        // Push new items into assignPosts
        data.items.forEach((item) => assignPosts.push(item));
      },
      error: (e) => {
        console.log(e);
      },
    });
  }

  loadMorePosts(page: number, numberPosts: number) {
    this.postService.getPosts('', page, numberPosts).subscribe({
      next: (data: PagedResult<Post>) => {
        this.isLoaded = true;

        this.morePosts = data.items;
      },
      error: (e) => {
        console.log(e);
      },
    });
  }
}
