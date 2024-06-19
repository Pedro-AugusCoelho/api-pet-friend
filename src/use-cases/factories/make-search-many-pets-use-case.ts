import { PrismaPetRepository } from "@/repositories/prisma/prisma-pet-repository";
import { SearchPetUseCase } from "../search-many-pets";

export function makeSearchManyPetsUseCase() {
  const petRepository = new PrismaPetRepository();
  const searchManyPetUseCase = new SearchPetUseCase(petRepository);

  return searchManyPetUseCase;
}
