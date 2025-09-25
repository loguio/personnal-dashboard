"use server";
import { prisma } from "@/providers/prisma/PrismaClient";

export default async function addToken({
  refreshToken,
  expiredDate,
}: {
  refreshToken: string;
  expiredDate: Date;
}) {
  await prisma.tokens.create({
    data: { stravaExpiredDate: expiredDate, stravaRefreshToken: refreshToken },
  });
}
