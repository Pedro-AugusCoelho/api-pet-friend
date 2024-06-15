import { PetRepository } from "@/repositories/pet-repository";

type TypeLevel = "BAIXA" | "MEDIA" | "ALTA";
type TypeEnvironment = "AMPLO";

interface CreatePetUseCaseRequest {
  name: string;
  about: string | null;
  year: number;
  size: number;
  energy: TypeLevel;
  independence: TypeLevel;
  environment: TypeEnvironment;
  userId: string;
}

export class CreatePetUseCase {
  constructor(private petRepository: PetRepository) {}

  async execute({
    name,
    about,
    energy,
    environment,
    independence,
    size,
    userId,
    year,
  }: CreatePetUseCaseRequest) {
    const pet = this.petRepository.create({
      name,
      about,
      energy,
      environment,
      independence,
      size,
      user_id: userId,
      year,
    });

    return {
      pet,
    };
  }
}
