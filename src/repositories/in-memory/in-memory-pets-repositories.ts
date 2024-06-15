import { Pet, Prisma } from "@prisma/client";
import { PetRepository } from "../pet-repository";
import { randomUUID } from "crypto";
import { Decimal } from "@prisma/client/runtime/library";

export class InMemoryPetsRepository implements PetRepository {
  public items: Pet[] = [];

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
