import { Pet, Prisma } from "@prisma/client";
import { PetRepository } from "../pet-repository";
import { randomUUID } from "crypto";
import { Decimal } from "@prisma/client/runtime/library";

export class InMemoryPetsRepository implements PetRepository {
  public items: Pet[] = [];

  async searchMany(
    name: string,
    energy: string,
    codCity: string,
    page: number,
  ) {
    return (
      this.items
        // .filter((item) => item.user.cod_city.includes(codCity))
        .filter((item) => item.name.includes(name))
        .filter((item) => item.energy.includes(energy))
        .slice((page - 1) * 20, page * 20)
    );
  }

  async searchUnique(id: string) {
    const pet = this.items.find((item) => item.id === id);

    if (!pet) {
      return null;
    }

    return pet;
  }

  async create(data: Prisma.PetUncheckedCreateInput) {
    const pet = {
      id: data.id ?? randomUUID(),
      name: data.name,
      about: data.about ?? null,
      year: new Decimal(data.year.toString()),
      size: new Decimal(data.size.toString()),
      energy: data.energy,
      independence: data.independence,
      environment: data.environment,
      created_at: new Date(),
      user_id: data.user_id,
    };

    this.items.push(pet);

    return pet;
  }
}
