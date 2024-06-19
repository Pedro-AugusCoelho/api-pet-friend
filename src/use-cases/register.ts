import { UserRepository } from "@/repositories/users-repository";
import { hash } from "bcryptjs";
import { UserAlreadyExistError } from "./errors/user-already-exist";
import { User } from "@prisma/client";

interface RegisterUseCaseRequest {
  name: string;
  email: string;
  password: string;
  city: string;
  cod_city: string;
  state: string;
  cod_state: string;
  telephone: string;
}

interface RegisterUseCaseResponse {
  user: User;
}

export class RegisterUseCase {
  constructor(private usersRepository: UserRepository) {}

  async execute({
    email,
    name,
    password,
    city,
    cod_city,
    cod_state,
    state,
    telephone,
  }: RegisterUseCaseRequest): Promise<RegisterUseCaseResponse> {
    const password_hash = await hash(password, 6);

    const userWithSameEmail = await this.usersRepository.findByEmail(email);

    if (userWithSameEmail) {
      throw new UserAlreadyExistError();
    }

    const user = await this.usersRepository.create({
      name,
      email,
      password_hash,
      city,
      cod_city,
      cod_state,
      state,
      telephone,
    });

    return {
      user,
    };
  }
}
