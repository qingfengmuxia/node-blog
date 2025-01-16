import { createServer } from 'node:http';
import app from './app.js';
import { serverConfig } from './utils/config.js';
import { logInfo } from './utils/logger.js';

const server = createServer(app);
const port = serverConfig.port;

server.listen(port, () => {
  logInfo(`listen at http://localhost:${port}`);
});
