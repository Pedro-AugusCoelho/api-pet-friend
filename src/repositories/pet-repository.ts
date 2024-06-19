import { Pet, Prisma } from "@prisma/client";

interface searchManyRequest {
  codCity: string;
  page: number;
  name?: string;
  energy?: string;
}
export interface PetRepository {
  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>;

  searchMany({
    codCity,
    page,
    energy,
    name,
  }: searchManyRequest): Promise<Pet[]>;

  searchUnique(id: string): Promise<Pet | null>;
}
