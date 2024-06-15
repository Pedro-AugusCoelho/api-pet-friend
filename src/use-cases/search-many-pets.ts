import { PetRepository } from "@/repositories/pet-repository";

interface SearchPetsUseCaseRequest {
  query: string;
  page: number;
}

export class SearchPetUseCase {
  constructor(private petRepository: PetRepository) {}

  async execute({ query, page }: SearchPetsUseCaseRequest) {
    const searchPets = await this.petRepository.searchMany(query, page);

    return {
      searchPets,
    };
  }
}
