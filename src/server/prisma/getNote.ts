"use server";
import { prisma } from "@/prisma/PrismaClient";

export default async function getNote() {
  return prisma.note.findFirst();
}
