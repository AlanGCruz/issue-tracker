import { createApp } from "./app";
import { initDb } from "./db/init";
import dotenv from "dotenv";
dotenv.config();

const app = createApp();
const port = Number(process.env.PORT) || 3000;

await initDb(); // Initialize DB before starting the server

const server = app.listen(port, () => {
  console.log(`🚀 Server is running on http://localhost:${port}`);
});

function shutdown(signal: string) {
  console.log(`\n${signal} received. Closing server...`);
  server.close(async (err) => {
    if (err) {
      console.error("Error during server close:", err);
      process.exit(1);
    }
    try {
      const { sequelize } = await import("./db/sequelize");
      await sequelize.close();
      console.log("🔌 DB connection closed.");
    } catch (e) {
      console.warn("DB close skipped or failed:", e);
    }
    console.log("HTTP server closed. Bye! 👋");
    process.exit(0);
  });
}

process.on("SIGINT", () => shutdown("SIGINT"));
process.on("SIGTERM", () => shutdown("SIGTERM"));
