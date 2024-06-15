import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { PetRepository } from "../pet-repository";

export class PrismaPetRepository implements PetRepository {
  async create(data: Prisma.PetUncheckedCreateInput) {
    const pet = await prisma.pet.create({
      data,
    });

    return pet;
  }

  async searchMany(query: string, page: number) {
    const pets = await prisma.pet.findMany({
      where: {
        name: {
          contains: query,
        },
      },
      take: 20,
      skip: (page - 1) * 20,
    });

    return pets;
  }
}
