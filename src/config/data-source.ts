import "reflect-metadata";
import { DataSource } from "typeorm";
import * as dotenv from "dotenv";

dotenv.config();

export const AppDataSource = new DataSource({
  type: "mysql",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT) || 3306,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  synchronize: false, // TRUE solo si quieres auto-crear las tablas, pero mejor manejar migraciones
  logging: true,
  ssl: {
    rejectUnauthorized: false,
  },
  entities: ["src/entities/**/*.ts"],
});
