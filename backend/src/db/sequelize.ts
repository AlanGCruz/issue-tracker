import { Sequelize } from "sequelize";
import "dotenv/config";

const connectionString = process.env.DATABASE_URL || "postgres://user:password@localhost:5433/issuetracker";
console.log('Attempting to connect with:', connectionString);

export const sequelize = new Sequelize(connectionString, {
    dialect: "postgres",
    logging: console.log, // Temporarily enable logging to debug connection issues
    dialectOptions: {
      ssl: false
    },
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  }
);