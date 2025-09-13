import { PrismaBetterSQLite3 } from "@prisma/adapter-better-sqlite3";
import { PrismaClient } from "../../generated/prisma";

const adapter = new PrismaBetterSQLite3({
  url: "file:./database/app.db",
});
export const prisma = new PrismaClient({ adapter });
