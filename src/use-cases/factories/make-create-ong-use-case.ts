import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";
import { CreateOngUseCase } from "../create-ong";

export function makeCreateOngUseCase() {
  const usersRepository = new PrismaUsersRepository();
  const createOngUseCase = new CreateOngUseCase(usersRepository);

  return createOngUseCase;
}
