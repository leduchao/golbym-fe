import { Routes } from '@angular/router';
import { ContactComponent } from './components/contact/contact.component';
import { BRAND } from './interfaces/brand-name';
import { HomeComponent } from './components/home/home.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { TodoComponent } from './components/todo/todo.component';
import { NewBlogsComponent } from './components/new-blogs/new-blogs.component';
import { BlogDetailComponent } from './components/blog-detail/blog-detail.component';
import { CreateBlogComponent } from './components/create-blog/create-blog.component';
import { UpdatePostComponent } from './components/update-post/update-post.component';

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
  // {
  //   path: 'update/:id',
  //   component: ProductDetailsComponent,
  //   title: BRAND + ' - Product details',
  // },
  {
    path: 'contact',
    component: ContactComponent,
    title: BRAND + ' - Contact',
  },
  {
    path: 'posts',
    component: NewBlogsComponent,
    title: BRAND + ' - Bài viết mới',
  },
  {
    path: 'posts',
    children: [
      {
        path: ':id',
        component: BlogDetailComponent,
      },
      // {
      //   path: 'create',
      //   component: CreateBlogComponent,
      // },
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
  // {
  //   path: '',
  //   component: CounterComponent,
  //   title: BRAND + ' - Happy New Year',
  // },
];
