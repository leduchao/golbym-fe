import { Routes } from '@angular/router';
import { ContactComponent } from './components/contact/contact.component';
import { BRAND } from './interfaces/brand-name';
import { HomeComponent } from './components/home/home.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { PostDetailComponent } from './components/post-detail/post-detail.component';
import { CreateBlogComponent } from './components/create-blog/create-blog.component';
import { UpdatePostComponent } from './components/update-post/update-post.component';
import { NewPostsComponent } from './components/new-posts/new-posts.component';
import { SearchListComponent } from './components/search-list/search-list.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    title: BRAND + ' - Home',
  },
  {
    path: 'create-post',
    component: CreateBlogComponent,
    title: BRAND + ' - Create blog',
  },
  {
    path: 'contact',
    component: ContactComponent,
    title: BRAND + ' - Contact',
  },
  {
    path: 'posts',
    component: NewPostsComponent,
    title: BRAND + ' - Bài viết mới',
  },
  {
    path: 'posts',
    children: [
      {
        path: 'search',
        component: SearchListComponent,
      },
      {
        path: ':id',
        component: PostDetailComponent,
      },
      {
        path: 'update/:id',
        component: UpdatePostComponent,
      },
    ],
  },
  {
    path: 'sign-in',
    component: SignInComponent,
    title: BRAND + ' - Sign in',
  },
  {
    path: 'sign-up',
    component: SignUpComponent,
    title: BRAND + ' - Sign up',
  },
  // {
  //   path: 'todo',
  //   component: TodoComponent,
  //   title: BRAND + ' - Todo app',
  // },
  {
    path: '**',
    component: PageNotFoundComponent,
    title: BRAND + ' - Page not found',
  },
];
