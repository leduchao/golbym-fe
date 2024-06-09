import { Component, DoCheck, Input, OnInit, inject } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Post } from '../../interfaces/post';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { PostService } from '../../services/post.service';
import {
  HttpErrorResponse,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { AuthSerrvice } from '../../services/auth.service';

@Component({
  selector: 'app-blog-detail',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './blog-detail.component.html',
  styleUrl: './blog-detail.component.scss',
})
export class BlogDetailComponent implements OnInit {
  post: Post | undefined;
  postId: string = '';
  relatedPosts: Post[] = [];

  roles: string = '';

  private titleService = inject(Title);
  private route = inject(ActivatedRoute);
  private postService = inject(PostService);
  private authService = inject(AuthSerrvice);
  private router = inject(Router);

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.postId = String(params['id']);
    });

    this.postService.getById(this.postId).subscribe({
      next: (post) => {
        this.post = post;
        this.titleService.setTitle(this.post.title);
      },
      error: (err: HttpErrorResponse) => {
        console.log(err);
        this.titleService.setTitle('Post detail');
      },
    });

    this.roles = this.authService.getUserRoles();
  }

  deletePost(postId: string) {
    var isConfirmed = confirm('Bạn muốn xóa bài viết này?');

    if (isConfirmed) {
      this.postService.deletePost(postId).subscribe({
        next: (resp) => {
          alert(resp);
          this.router.navigate(['/posts']);
        },
        error: (e) => {
          console.log(e);
        },
      });
    }
  }
}
