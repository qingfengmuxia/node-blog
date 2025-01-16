import bcrypt from 'bcrypt';
import { Router } from 'express';
import { getRegisterData } from '../validators/register.validator.js';
import { getLoginData } from '../validators/login.validator.js';
import { HttpException } from '../utils/http-exception.js';
import { dataSource } from '../data-source.js';
import { User } from '../entities/user.entity.js';
import { generateToken } from '../utils/auth.js';
import { UserDto } from '../dto/user.dto.js';
import { authentication } from '../middlewares/authentication.js';
import { getUpdateUserData } from '../validators/update-user.validator.js';

const usersRouter = Router();
const usersRepository = dataSource.getRepository(User);

// get current user
usersRouter.get('/', authentication, async (request, response) => {
  const userId = parseInt(response.getHeader('userId') as string);
  const user = await usersRepository.findOne({
    where: {
      id: userId
    },
    relations: {
      posts: true
    }
  });
  if (!user) throw new HttpException('user not found', 404);
  const returnUser = new UserDto(user);
  response.status(200).json(returnUser);
});

// update current user
usersRouter.put('/', authentication, async (request, response) => {
  const userId = parseInt(response.getHeader('userId') as string);
  const updateUserDate = getUpdateUserData(request.body);
  await usersRepository.update(userId, { ...updateUserDate });
  const updatedUser = (await usersRepository.findOne({
    where: { id: userId }
  })) as User;
  const returnUser = new UserDto(updatedUser);
  response.status(201).json(returnUser);
});

// login action
usersRouter.post('/', async (request, response) => {
  const data = getLoginData(request.body);
  const user = await usersRepository.findOneBy({ email: data.email });
  if (!user) throw new HttpException('user not found', 404);
  const passwordCorrect = await bcrypt.compare(data.password, user.password);
  if (!passwordCorrect) throw new HttpException('invalid password', 400);
  const returnUser = new UserDto(user);
  const token = generateToken({ ...returnUser });
  response.status(200).json({ user: returnUser, token });
});

// register action
usersRouter.post('/register', async (request, response) => {
  const data = getRegisterData(request.body);
  const existentUser = await usersRepository.findOneBy({ email: data.email });
  if (existentUser) throw new HttpException('existent email', 400);
  const hash = await bcrypt.hash(data.password, 10);
  const userData = { ...data, password: hash };
  const user = usersRepository.create(userData);
  await usersRepository.save(user);
  const returnUser = new UserDto(user);
  const token = generateToken({ ...returnUser });
  response.status(201).json({ user: returnUser, token });
});

// delete one user
usersRouter.delete('/', authentication, async (request, response) => {
  const userId = parseInt(response.getHeader('userId') as string);
  const user = await usersRepository.findOneBy({
    id: userId
  });
  if (!user) throw new HttpException('user not found', 404);
  await usersRepository.remove(user);
  response.status(204).end();
});

export default usersRouter;
