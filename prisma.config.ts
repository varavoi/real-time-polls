// prisma.config.ts
import 'dotenv/config'
import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: 'prisma/schema.prisma', // Путь к вашей схеме
  migrations: {
    path: 'prisma/migrations',    // Папка для миграций
  },
  datasource: {
    url: "file:./dev.db",         // URL базы данных переносим сюда
  },
})