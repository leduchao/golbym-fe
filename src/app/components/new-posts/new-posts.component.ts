import { Component, inject } from '@angular/core';
import { PostListComponent } from '../post-list/post-list.component';

@Component({
  selector: 'app-new-posts',
  standalone: true,
  imports: [PostListComponent],
  templateUrl: './new-posts.component.html',
  styleUrl: './new-posts.component.scss',
})
export class NewPostsComponent {}
