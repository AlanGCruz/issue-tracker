import { sequelize } from "./sequelize";
import { Issue } from "./models/Issue";

export async function initDb() {
  try {
    await sequelize.authenticate();
    console.log("✅ DB connection established");
    await sequelize.sync({ alter: true }); // creates/updates tables
    console.log("✅ Models synchronized");
  } catch (err) {
    console.error("❌ DB connection failed:", err);
    process.exit(1);
  }
}
