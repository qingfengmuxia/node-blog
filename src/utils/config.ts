import 'dotenv/config';

export const tokenConfig = { secretKey: process.env.SECRET_KEY as string };

export const serverConfig = { port: process.env.PORT as string };

export const DbConfig = {
  host: process.env.DATABASE_HOST,
  port: parseInt(process.env.DATABASE_PORT as string),
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  databaseName: getDatabaseName(),
  synchronize:
    process.env.NODE_ENV && process.env.NODE_ENV === 'production'
      ? false
      : true,
  dropSchema: process.env.NODE_ENV === 'test' ? true : false,
  entities:
    process.env.NODE_ENV && process.env.NODE_ENV === 'production'
      ? ['build/entities/*.js']
      : ['src/entities/*.ts']
};

function getDatabaseName(): string {
  let databaseName: string;
  switch (process.env.NODE_ENV as string) {
    case 'development':
      databaseName = process.env.DEV_DATABASE_NAME as string;
      break;
    case 'test':
      databaseName = process.env.TEST_DATABASE_NAME as string;
      break;
    case 'production':
      databaseName = process.env.PROD_DATABASE_NAME as string;
      break;
    default:
      databaseName = process.env.DEV_DATABASE_NAME as string;
  }
  return databaseName;
}
