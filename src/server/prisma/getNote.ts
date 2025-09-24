"use server";
import { prisma } from "@/providers/prisma/PrismaClient";

export default async function getNote() {
  return prisma.note.findFirst();
}
