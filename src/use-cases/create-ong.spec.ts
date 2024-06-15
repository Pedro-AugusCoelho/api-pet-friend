import { InMemoryUsersRepository } from "../repositories/in-memory/in-memory-users-repositories";
import { CreateOngUseCase } from "./create-ong";
import { describe, beforeEach, expect, it } from "vitest";
import { hash } from "bcryptjs";

let usersRepository: InMemoryUsersRepository;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
let sut: CreateOngUseCase;

describe("Create Pet Use Case", () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    sut = new CreateOngUseCase(usersRepository);
  });

  it("Should to create pet", async () => {
    const { ong } = await sut.execute({
      name: "Federico",
      email: "example@example.com",
      password_hash: await hash("123456@", 6),
    });

    expect(ong.id).toEqual(expect.any(String));
  });
});
