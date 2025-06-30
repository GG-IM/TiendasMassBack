import "reflect-metadata";
import { DataSource } from "typeorm";
import * as dotenv from "dotenv";
import * as fs from "fs";  // Asegúrate de tener esta importación para leer el archivo de certificado
import * as path from "path";
 
dotenv.config();

const isCompiled = __dirname.includes("dist");

export const AppDataSource = new DataSource({
  type: "mysql",
  host: "tiendasmass.mysql.database.azure.com",  // Asegúrate de colocar tu host correctamente
  port: 3306,
  username: "tilioes",
  password: "Michita0123+",  // Usa el password real aquí
  database: "tiendasmass",
  synchronize: true,
  logging: true,
  ssl: {
    rejectUnauthorized: false,  // Si no necesitas validar estrictamente el certificado
  },
  entities: [isCompiled ? "dist/entities/**/*.js" : "src/entities/**/*.ts"],
});
