import { Component, OnInit, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { PostRequest } from '../../interfaces/post-request';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-create-blog',
  standalone: true,
  imports: [CKEditorModule, ReactiveFormsModule, RouterModule],
  templateUrl: './create-blog.component.html',
  styleUrl: './create-blog.component.scss',
})
export class CreateBlogComponent {
  ckEditor = ClassicEditor;

  config = {
    placeholder: 'Hãy nhập nội dung...',
  };

  createBlogForm = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.minLength(3)]),
    content: new FormControl('', Validators.required),
    tags: new FormControl(''),
  });

  private url = `${environment.BASE_URL}/posts`;
  private httpClient = inject(HttpClient);
  private router = inject(Router);

  private fileUpload: any;

  submitPost() {
    const newPost: PostRequest = {
      title: this.createBlogForm.value.title ?? '',
      content: this.createBlogForm.value.content ?? '',
      releaseDate: String(
        new Date().toLocaleDateString('en-CA', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
        })
      ),
      tags: this.createBlogForm.value.tags ?? '',
    };

    const formData = new FormData();

    formData.append('title', newPost.title);
    formData.append('content', newPost.content);
    formData.append('releaseDate', newPost.releaseDate);
    formData.append('tags', newPost.tags);
    formData.append('thumbnail', this.fileUpload);

    this.httpClient
      .post<any>(this.url, formData, {
        observe: 'response',
      })
      .subscribe({
        next: (data: HttpResponse<any>) => {
          console.log(data);

          this.router.navigate(['/posts', data.body.id]);
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
