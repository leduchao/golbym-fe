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

  posts: Post[] = [];
  morePosts: Post[] = [];

  ngOnInit(): void {
    this.loadPosts(1, 4, this.posts);
    this.loadPosts(2, 4, this.morePosts);
  }

  loadPosts(page: number, numberPosts: number, assignPosts: Post[]) {
    this.postService.getAll(page, numberPosts).subscribe({
      next: (data: PagedResult<Post>) => {
        // Clear the existing content of assignPosts
        assignPosts.splice(0, assignPosts.length);
        // Push new items into assignPosts
        data.items.forEach((item) => assignPosts.push(item));
        // console.log(assignPosts);
      },
      error: (e) => {
        console.log(e);
      },
    });
  }
}
