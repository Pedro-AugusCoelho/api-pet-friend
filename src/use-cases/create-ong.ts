import { UserRepository } from "@/repositories/users-repository";
import { hash } from "bcryptjs";

interface CreateOngUseCaseRequest {
  name: string;
  email: string;
  password_hash: string;
}

export class CreateOngUseCase {
  constructor(private usersRepository: UserRepository) {}

  async execute({ email, name, password_hash }: CreateOngUseCaseRequest) {
    const ong = await this.usersRepository.create({
      email,
      name,
      role: "MEMBER",
      password_hash: await hash(password_hash, 6),
    });

    return {
      ong,
    };
  }
}
