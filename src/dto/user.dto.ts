import { Post } from '../entities/post.entity.js';
import { PostDto } from './post.dto.js';

export class UserDto {
  id: number;
  username: string;
  email: string;
  posts: PostDto[];
  constructor(data: {
    id: number;
    username: string;
    email: string;
    posts?: Post[];
  }) {
    this.id = data.id;
    this.username = data.username;
    this.email = data.email;
    if (data.posts) {
      this.posts = data.posts.map((p) => new PostDto(p));
    }
  }
}
