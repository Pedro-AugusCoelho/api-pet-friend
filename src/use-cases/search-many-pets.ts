import { PetRepository } from "@/repositories/pet-repository";

interface SearchPetsUseCaseRequest {
  name: string;
  energy: string;
  page: number;
  codCity: string;
}

export class SearchPetUseCase {
  constructor(private petRepository: PetRepository) {}

  async execute({ name, energy, codCity, page }: SearchPetsUseCaseRequest) {
    const searchPets = await this.petRepository.searchMany(
      name,
      energy,
      codCity,
      page,
    );

    return {
      searchPets,
    };
  }
}
