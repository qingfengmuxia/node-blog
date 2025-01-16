import express from 'express';
import 'dotenv/config';
import 'reflect-metadata';
import 'express-async-errors';
import usersRouter from './routers/users.js';
import { logInfo, logError } from './utils/logger.js';
import { requestLogger } from './middlewares/request-logger.js';
import { errorHandler } from './middlewares/error-handler.js';
import { unknownEndpoint } from './middlewares/unknown-endpoint.js';
import { dataSource } from './data-source.js';
import postsRouter from './routers/posts.js';
import { authentication } from './middlewares/authentication.js';

const app = express();

try {
  await dataSource.initialize();
  logInfo('database connect successful');
} catch (err) {
  logError(err);
}

app.use(express.json());
app.use(requestLogger);

app.get('/', (request, response) => {
  response.send('hello world!');
});
app.use('/users', usersRouter);

app.use(authentication);
app.use('/posts', postsRouter);

app.use(unknownEndpoint);
app.use(errorHandler);

export default app;
