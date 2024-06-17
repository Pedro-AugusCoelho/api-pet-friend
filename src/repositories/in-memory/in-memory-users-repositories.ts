import { Prisma, User } from "@prisma/client";
import { randomUUID } from "crypto";
import { UserRepository } from "../users-repository";

export class InMemoryUsersRepository implements UserRepository {
  public items: User[] = [];

  async findById(id: string) {
    const user = this.items.find((item) => item.id === id);

    if (!user) {
      return null;
    }

    return user;
  }

  async findByEmail(email: string) {
    const user = this.items.find((item) => item.email === email);

    if (!user) {
      return null;
    }

    return user;
  }

  async create(data: Prisma.UserUncheckedCreateInput) {
    const user = {
      id: data.id ?? randomUUID(),
      role: data.role ?? "MEMBER",
      name: data.name,
      email: data.email,
      telephone: data.telephone,
      password_hash: data.password_hash,
      created_at: new Date(),
      city: data.city,
      cod_city: data.cod_city,
      state: data.state,
      cod_state: data.cod_state,
    };

    this.items.push(user);

    return user;
  }
}
