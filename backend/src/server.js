import app from "./app.js";
import { prisma } from "./config/database.js";
import { env } from "./config/env.js";

async function start() {
  try {
    await prisma.$connect();
    const server = app.listen(env.PORT, () => {
      console.log(`Vibe Coffee API dang chay tai http://localhost:${env.PORT}`);
    });

    const shutdown = () => {
      server.close(async () => {
        await prisma.$disconnect();
        process.exit(0);
      });
    };

    process.on("SIGINT", shutdown);
    process.on("SIGTERM", shutdown);
  } catch (error) {
    console.error("Khong the ket noi PostgreSQL. Kiem tra DATABASE_URL.", error.message);
    await prisma.$disconnect();
    process.exit(1);
  }
}

start();
