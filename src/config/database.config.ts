import { DataSource, DataSourceOptions } from 'typeorm';
import * as dotenv from 'dotenv';

dotenv.config();

export const dataSourceOption: DataSourceOptions = {
  type: <any>process.env.DB_CONNECTION,
  host: process.env.DB_HOST,
  port: <any>process.env.DB_PORT,
  database: process.env.DB_DATABASE,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  synchronize: <any>process.env.DB_SYNCHRONIZE,
  migrations: ['src/database/migrations/*.ts'],
  migrationsRun: true,
};

const dataSource = new DataSource(dataSourceOption);
export default dataSource;
