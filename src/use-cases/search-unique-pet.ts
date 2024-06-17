import { PetRepository } from "@/repositories/pet-repository";

interface SearchUniquePetsUseCaseRequest {
  id: string;
}

export class SearchUniquePetUseCase {
  constructor(private petRepository: PetRepository) {}

  async execute({ id }: SearchUniquePetsUseCaseRequest) {
    const searchPet = await this.petRepository.searchUnique(id);

    return {
      searchPet,
    };
  }
}
