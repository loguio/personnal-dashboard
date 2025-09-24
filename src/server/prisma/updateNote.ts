"use server";
import { prisma } from "@/providers/prisma/PrismaClient";

export default async function updateNote(note: string) {
  const existingNote = await prisma.note.findFirst();
  if (existingNote) {
    return prisma.note.update({
      data: {
        text: note,
      },
      where: { id: existingNote.id },
    });
  }
  return prisma.note.create({
    data: { text: note },
  });
}
