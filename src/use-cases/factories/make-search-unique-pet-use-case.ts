import { PrismaPetRepository } from "@/repositories/prisma/prisma-pet-repository";
import { SearchUniquePetUseCase } from "../search-unique-pet";

export function makeSearchUniquePetsUseCase() {
  const petRepository = new PrismaPetRepository();
  const searchUniquePetUseCase = new SearchUniquePetUseCase(petRepository);

  return searchUniquePetUseCase;
}
