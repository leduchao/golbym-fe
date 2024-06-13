import { Component, Input } from '@angular/core';
import { Post } from '../../interfaces/post';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss',
})
export class PostComponent {
  @Input() post: Post = {
    id: '',
    title: '',
    content: '',
    author: '',
    releaseDate: '',
    thumnail: '',
    tags: [],
  };
}
