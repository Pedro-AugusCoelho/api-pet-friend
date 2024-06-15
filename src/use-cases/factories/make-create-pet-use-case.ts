import { PrismaPetRepository } from "@/repositories/prisma/prisma-pet-repository";
import { CreatePetUseCase } from "../create-pet";

export function makeCreatePetUseCase() {
  const petRepository = new PrismaPetRepository();
  const authenticateUseCase = new CreatePetUseCase(petRepository);

  return authenticateUseCase;
}
