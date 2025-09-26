import { Sequelize } from "sequelize";

export const sequelize = new Sequelize(
  process.env.DB_NAME || "issues_db", // database
  process.env.DB_USER || "postgres",  // username
  process.env.DB_PASS || "yourpassword", // password
  {
    host: process.env.DB_HOST || "localhost",
    port: Number(process.env.DB_PORT) || 5432,
    dialect: "postgres",
    logging: false,
  }
);