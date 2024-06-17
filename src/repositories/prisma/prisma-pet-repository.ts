import { prisma } from "@/lib/prisma";
import { Level, Prisma } from "@prisma/client";
import { PetRepository } from "../pet-repository";

export class PrismaPetRepository implements PetRepository {
  async create(data: Prisma.PetUncheckedCreateInput) {
    const pet = await prisma.pet.create({
      data,
    });

    return pet;
  }

  async searchMany(name: string, energy: Level, codCity: string, page: number) {
    const pets = await prisma.pet.findMany({
      where: {
        AND: [
          {
            name: {
              contains: name,
            },
            energy,
          },
          {
            user: {
              cod_city: codCity, // substitua 'NomeDaCidade' pela cidade que você está procurando
            },
          },
        ],
      },
      include: {
        user: true, // opcional, se você quiser incluir detalhes da organização no resultado
      },
      take: 20,
      skip: (page - 1) * 20,
    });

    return pets;
  }

  async searchUnique(id: string) {
    const pet = await prisma.pet.findUnique({
      where: {
        id,
      },
    });

    return pet;
  }
}
