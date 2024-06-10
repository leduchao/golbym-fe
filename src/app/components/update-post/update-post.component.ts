import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { PostService } from '../../services/post.service';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { PostRequest } from '../../interfaces/post-request';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Post } from '../../interfaces/post';
import { Title } from '@angular/platform-browser';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-update-post',
  standalone: true,
  imports: [ReactiveFormsModule, CKEditorModule, RouterLink],
  templateUrl: './update-post.component.html',
  styleUrl: './update-post.component.scss',
})
export class UpdatePostComponent implements OnInit, OnDestroy {
  ckEditor = ClassicEditor;

  config = {
    placeholder: 'Hãy nhập nội dung...',
  };

  private postService = inject(PostService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private titleService = inject(Title);
  private routerSub!: Subscription;

  private fileUpload: any;
  postId = '';
  post?: Post;

  updateForm = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.minLength(3)]),
    content: new FormControl('', Validators.required),
    tags: new FormControl(''),
  });

  ngOnInit(): void {
    this.routerSub = this.route.params.subscribe((params) => {
      this.postId = String(params['id']);

      this.loadPost(this.postId);
    });
  }

  ngOnDestroy(): void {
    if (this.routerSub) this.routerSub.unsubscribe();
  }

  loadPost(postId: string) {
    this.postService.getById(postId).subscribe({
      next: (post) => {
        this.post = post;
        this.titleService.setTitle(this.post.title);
      },
      error: (err: HttpErrorResponse) => {
        console.log(err);
        this.router.navigate(['/create-post']);
      },
    });
  }

  submitPost(postId: string) {
    const newPost: PostRequest = {
      title: !this.updateForm.value.title
        ? this.post?.title ?? ''
        : this.updateForm.value.title,
      content: !this.updateForm.value.content
        ? this.post?.content ?? ''
        : this.updateForm.value.content,
      releaseDate: String(
        new Date().toLocaleDateString('en-CA', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
        })
      ),
      tags: this.updateForm.value.tags ?? '',
    };

    const formData = new FormData();

    formData.append('title', newPost.title);
    formData.append('content', newPost.content);
    formData.append('releaseDate', newPost.releaseDate);
    formData.append('tags', newPost.tags);
    formData.append('thumbnail', this.fileUpload);

    this.postService.updatePost(postId, formData).subscribe({
      next: (data: HttpResponse<any>) => {
        console.log(data);

        this.router.navigate(['/posts', postId]);
      },
      error: (e) => {
        console.log(e);
      },
    });
  }

  addFile(event: any) {
    this.fileUpload = event.target.files[0];
  }
}
