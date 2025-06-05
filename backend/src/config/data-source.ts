import "reflect-metadata";
import { DataSource } from "typeorm";
// Agrega aquí todas tus entidades

export const AppDataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "root",
  password: "123456789",
  database: "tiendasmass",
  synchronize: false,
  logging: true,
  entities: ["src/entities/**/*.ts"],
});
