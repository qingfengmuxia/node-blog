import { Router } from 'express';
import { dataSource } from '../data-source.js';
import { Post } from '../entities/post.entity.js';
import { User } from '../entities/user.entity.js';
import { HttpException } from '../utils/http-exception.js';
import { getPostData } from '../validators/post.validator.js';
import { PostDto } from '../dto/post.dto.js';

const postsRouter = Router();
const usersRepository = dataSource.getRepository(User);
const postsRepository = dataSource.getRepository(Post);

postsRouter.get('/', async (request, response) => {
  const userId = parseInt(response.getHeader('userId') as string);
  const user = (await usersRepository.findOne({
    where: { id: userId },
    relations: { posts: true }
  })) as User;
  const posts = user.posts;
  const returnPosts = posts.map((p) => new PostDto(p));
  response.status(200).json({ posts: returnPosts });
});

postsRouter.post('/', async (request, response) => {
  const data = getPostData(request.body);
  const userId = parseInt(response.getHeader('userId') as string);
  const user = (await usersRepository.findOne({
    where: { id: userId },
    relations: { posts: true }
  })) as User;
  const existentPost = user.posts.filter((p) => p.title === data.title);
  if (existentPost.length > 0) throw new HttpException('existent title', 400);
  const post = postsRepository.create({ ...data, user });
  await postsRepository.save(post);
  const returnPost = new PostDto(post);
  response.status(201).json(returnPost);
});

postsRouter.get('/:id', async (request, response) => {
  const requestId = parseInt(request.params.id as string);
  if (isNaN(requestId)) throw new HttpException('invalid id', 400);
  const post = await postsRepository.findOne({
    where: { id: requestId },
    relations: { user: true }
  });
  if (!post) throw new HttpException('post not found', 404);
  const returnPost = new PostDto(post);
  response.status(200).json(returnPost);
});

postsRouter.put('/:id', async (request, response) => {
  const data = getPostData(request.body);
  const requestId = parseInt(request.params.id as string);
  if (isNaN(requestId)) throw new HttpException('invalid id', 400);
  const existentPost = await postsRepository.findOneBy({ id: requestId });
  if (!existentPost) throw new HttpException('post not found', 404);
  await postsRepository.update(existentPost.id, { ...data });
  const updatedPost = (await postsRepository.findOneBy({
    id: requestId
  })) as Post;
  const returnPost = new PostDto(updatedPost);
  response.status(201).json(returnPost);
});

postsRouter.delete('/:id', async (request, response) => {
  const requestId = parseInt(request.params.id as string);
  if (isNaN(requestId)) throw new HttpException('invalid id', 400);
  const post = await postsRepository.findOneBy({ id: requestId });
  if (!post) throw new HttpException('post not found', 404);
  await postsRepository.remove(post);
  response.status(204).end();
});

export default postsRouter;
