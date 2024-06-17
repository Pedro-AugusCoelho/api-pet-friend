import { Pet, Prisma } from "@prisma/client";

export interface PetRepository {
  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>;
  searchMany(
    name: string,
    energy: string,
    codCity: string,
    page: number,
  ): Promise<Pet[]>;
  searchUnique(id: string): Promise<Pet | null>;
}
