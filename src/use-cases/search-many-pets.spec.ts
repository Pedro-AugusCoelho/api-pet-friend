import { InMemoryPetsRepository } from "../repositories/in-memory/in-memory-pets-repositories";
import { beforeEach, describe, expect, it } from "vitest";
import { SearchPetUseCase } from "./search-many-pets";

let petsRepository: InMemoryPetsRepository;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
let sut: SearchPetUseCase;

describe("Search Pet Use Case", () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository();
    sut = new SearchPetUseCase(petsRepository);
  });

  it("Should to search pets", async () => {
    await petsRepository.create({
      name: "Federico",
      energy: "MEDIA",
      environment: "MEDIO",
      independence: "ALTA",
      size: 40,
      user_id: "ONG-01",
      year: 2,
      about: "Sobre o cão",
    });

    await petsRepository.create({
      name: "Federico",
      energy: "MEDIA",
      environment: "MEDIO",
      independence: "ALTA",
      size: 25,
      user_id: "ONG-01",
      year: 2,
      about: "Sobre o cão",
    });

    const { searchPets } = await sut.execute({
      query: "Federico",
      page: 1,
    });

    expect(searchPets).toHaveLength(2);
    expect(searchPets).toEqual([
      expect.objectContaining({ energy: "MEDIA" }),
      expect.objectContaining({ independence: "ALTA" }),
    ]);
  });
});
