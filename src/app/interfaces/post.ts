import { Tag } from './tag';

export interface Post {
  id: string;
  title: string;
  author: string;
  thumnail: string;
  releaseDate: string;
  content: string;
  tags: Tag[];
}
