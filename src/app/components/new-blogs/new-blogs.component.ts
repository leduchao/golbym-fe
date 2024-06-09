import { Component, OnInit, inject } from '@angular/core';
import { Post } from '../../interfaces/post';
import { RouterModule } from '@angular/router';
import { PostService } from '../../services/post.service';
import { HttpResponse } from '@angular/common/http';
import { AuthSerrvice } from '../../services/auth.service';

@Component({
  selector: 'app-new-blogs',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './new-blogs.component.html',
  styleUrl: './new-blogs.component.scss',
})
export class NewBlogsComponent implements OnInit {
  posts: Post[] = [];

  private pageSize = 9;
  pages: number[] = [];

  private postService = inject(PostService);

  ngOnInit(): void {
    this.getAllPost();
  }

  getAllPost() {
    this.postService.getAll().subscribe({
      next: (posts) => {
        this.posts = posts;
        this.paging();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  getPostById(id: string) {
    this.postService.getById(id).subscribe({
      next: (post) => {
        console.log(post);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  paging(): void {
    this.pages = Array.from(
      { length: Math.ceil(this.posts.length / this.pageSize) },
      (_, i) => i + 1
    );
  }
}
