import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Post } from '../../interfaces/post';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { PostService } from '../../services/post.service';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthSerrvice } from '../../services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-blog-detail',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './post-detail.component.html',
  styleUrl: './post-detail.component.scss',
})
export class PostDetailComponent implements OnInit, OnDestroy {
  isLoaded = false;

  post: Post | undefined;
  postId: string = '';
  relatedPosts: Post[] = [];

  roles: string = '';

  private titleService = inject(Title);
  private route = inject(ActivatedRoute);
  private postService = inject(PostService);
  private authService = inject(AuthSerrvice);
  private router = inject(Router);
  private routerSub!: Subscription;

  ngOnInit(): void {
    this.routerSub = this.route.params.subscribe((params) => {
      this.postId = String(params['id']);

      this.loadPost(this.postId);
      this.loadRelatedPosts(this.postId);
    });

    this.roles = this.authService.getUserRoles();
  }

  ngOnDestroy(): void {
    if (this.routerSub) this.routerSub.unsubscribe();
  }

  loadPost(postId: string) {
    this.postService.getById(postId).subscribe({
      next: (post) => {
        this.isLoaded = true;
        this.post = post;
        this.titleService.setTitle(this.post.title);
      },
      error: (err: HttpErrorResponse) => {
        console.log(err);
        this.titleService.setTitle('Post detail');
      },
    });
  }

  loadRelatedPosts(postId: string) {
    this.postService.getRelatedPosts(postId).subscribe({
      next: (data: Post[]) => {
        this.isLoaded = true;
        this.relatedPosts = data;
      },
      error: (e) => console.log(e),
    });
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
