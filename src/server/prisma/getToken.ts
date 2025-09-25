"use server";
import { prisma } from "@/providers/prisma/PrismaClient";

export default async function getToken() {
  return await prisma.tokens.findFirst();
}
