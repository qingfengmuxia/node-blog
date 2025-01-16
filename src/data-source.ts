import { DataSource } from 'typeorm';
import { DbConfig } from './utils/config.js';

export const dataSource = new DataSource({
  type: 'postgres',
  host: DbConfig.host,
  port: DbConfig.port,
  username: DbConfig.username,
  password: DbConfig.password,
  database: DbConfig.databaseName,
  synchronize: DbConfig.synchronize,
  entities: DbConfig.entities,
  dropSchema: DbConfig.dropSchema,
  subscribers: [],
  migrations: []
});
