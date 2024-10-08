// To use read-only SQLite DB in production
// https://github.com/keystonejs/keystone/discussions/8990#discussioncomment-8984266

import { PrismaClient } from "@prisma/client";
import path from "path";

declare global {
  // eslint-disable-next-line no-var
  var cachedPrisma: PrismaClient;
}

// Workaround to find the db file in production
const filePath = path.join(process.cwd(), "prisma/dev.db");
const config = {
  datasources: {
    db: {
      url: "file:" + filePath,
    },
  },
};

let prisma: PrismaClient;
if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient(config);
} else {
  if (!global.cachedPrisma) {
    global.cachedPrisma = new PrismaClient(config);
  }
  prisma = global.cachedPrisma;
}

export default prisma;
