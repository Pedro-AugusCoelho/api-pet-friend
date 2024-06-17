import { InMemoryPetsRepository } from "../repositories/in-memory/in-memory-pets-repositories";
import { beforeEach, describe, expect, it } from "vitest";
import { SearchUniquePetUseCase } from "./search-unique-pet";
import { randomUUID } from "crypto";

let petsRepository: InMemoryPetsRepository;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
let sut: SearchUniquePetUseCase;

describe("Search Pet Use Case", () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository();
    sut = new SearchUniquePetUseCase(petsRepository);
  });

  it("Should to search pet", async () => {
    const idUnique = randomUUID();

    await petsRepository.create({
      id: idUnique,
      name: "Federico",
      energy: "MEDIA",
      environment: "MEDIO",
      independence: "ALTA",
      size: 40,
      user_id: "ONG-01",
      year: 2,
      about: "Sobre o cão",
    });

    const { searchPet } = await sut.execute({ id: idUnique });

    expect(searchPet).not.toBeNull();
    expect(searchPet!.id).toBe(idUnique);
  });
});
