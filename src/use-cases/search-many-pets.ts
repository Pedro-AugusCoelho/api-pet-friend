import { PetRepository } from "@/repositories/pet-repository";
import { RequiredCodCity } from "./errors/required-cod-city";

interface SearchPetsUseCaseRequest {
  page: number;
  codCity: string;
  name?: string;
  energy?: string;
}

export class SearchPetUseCase {
  constructor(private petRepository: PetRepository) {}

  async execute({ name, energy, codCity, page }: SearchPetsUseCaseRequest) {
    if (!codCity) {
      throw new RequiredCodCity();
    }

    const searchPets = await this.petRepository.searchMany({
      codCity,
      page,
      energy,
      name,
    });

    return {
      searchPets,
    };
  }
}
