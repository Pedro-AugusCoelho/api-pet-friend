import { prisma } from "@/lib/prisma";
import { Level, Prisma } from "@prisma/client";
import { PetRepository } from "../pet-repository";

interface SearchPetsUseCaseRequest {
  page: number;
  codCity: string;
  name?: string;
  energy?: Level;
}

export class PrismaPetRepository implements PetRepository {
  async create(data: Prisma.PetUncheckedCreateInput) {
    const pet = await prisma.pet.create({
      data,
    });

    return pet;
  }

  async searchMany({ codCity, page, energy, name }: SearchPetsUseCaseRequest) {
    const filters = {
      ...(name && { name: { contains: name } }),
      ...(energy && { energy }),
      user: {
        cod_city: codCity,
      },
    };

    const where = Object.keys(filters).length > 0 ? { AND: [filters] } : {};

    const pets = await prisma.pet.findMany({
      where,
      include: {
        user: true,
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
