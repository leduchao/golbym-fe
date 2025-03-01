import { Tag } from './tag';

export interface Post {
  id: string;
  title: string;
  author: string;
  thumbnail: string;
  releaseDate: string;
  content: string;
  tags: Tag[];
}
