import { PrismaClient } from '@prisma/client';

declare global {
  // eslint-disable-next-line no-var
  var __prisma: PrismaClient | undefined;
}

let prisma: PrismaClient;

if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient();
  await prisma.$connect();
} else {
  if (!globalThis.__prisma) {
    globalThis.__prisma = new PrismaClient();
    await globalThis.__prisma.$connect();
  }
  prisma = globalThis.__prisma;
}

export { prisma };
