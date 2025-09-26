import { sequelize } from "./sequelize";

export async function initDb() {
  try {
    await sequelize.authenticate();
    console.log("✅ DB connection established");
    await sequelize.sync(); // only create tables if they don't exist
    console.log("✅ Models synchronized");
  } catch (err) {
    console.error("❌ DB connection failed:", err);
    process.exit(1);
  }
}
