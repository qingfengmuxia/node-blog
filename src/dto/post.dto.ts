import { User } from '../entities/user.entity.js';
import { UserDto } from './user.dto.js';

export class PostDto {
  id: number;
  title: string;
  content: string;
  createAt: string;
  updateAt: string;
  user?: UserDto;
  constructor(data: {
    id: number;
    title: string;
    content: string;
    createAt: Date;
    updateAt: Date;
    user?: User;
  }) {
    this.id = data.id;
    this.title = data.title;
    this.content = data.content;
    this.createAt = data.createAt.toLocaleString();
    this.updateAt = data.updateAt.toLocaleString();
    if (data.user) {
      this.user = new UserDto(data.user);
    }
  }
}
