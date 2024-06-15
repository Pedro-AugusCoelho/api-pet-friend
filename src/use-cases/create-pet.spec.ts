import { expect, describe, it, beforeEach } from "vitest";

import { InMemoryPetsRepository } from "../repositories/in-memory/in-memory-pets-repositories";
import { CreatePetUseCase } from "./create-pet";

let petsRepository: InMemoryPetsRepository;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
let sut: CreatePetUseCase;

describe("Create Pet Use Case", () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository();
    sut = new CreatePetUseCase(petsRepository);
  });

  it("Should to create pet", async () => {
    const newPet = await petsRepository.create({
      name: "Federico",
      energy: "MEDIA",
      environment: "MEDIO",
      independence: "ALTA",
      size: 40,
      user_id: "ONG-01",
      year: 2,
      about: "Sobre o cão",
    });

    expect(newPet.id).toEqual(expect.any(String));
  });
});
