import { expect, describe, it, beforeEach } from "vitest";
import { RegisterUseCase } from "./register";
import { compare } from "bcryptjs";
import { InMemoryUsersRepository } from "../repositories/in-memory/in-memory-users-repositories";
import { UserAlreadyExistError } from "./errors/user-already-exist";

let usersRepository: InMemoryUsersRepository;
let sut: RegisterUseCase;

describe("Register Use Case", () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    sut = new RegisterUseCase(usersRepository);
  });

  it("Should be able to register", async () => {
    const { user } = await sut.execute({
      name: "Pedro A.",
      email: "pedro@pedro.com",
      password: "123456@",
      city: "SJC",
      cod_city: "0101",
      cod_state: "SP",
      state: "0202",
      telephone: "1297854515",
    });

    expect(user.id).toEqual(expect.any(String));
  });

  it("Should hash user password upon registration", async () => {
    const { user } = await sut.execute({
      name: "Pedro A.",
      email: "pedro@pedro.com",
      password: "123456@",
      city: "SJC",
      cod_city: "0101",
      cod_state: "SP",
      state: "0202",
      telephone: "1297854515",
    });

    const isPasswordCorrectlyHashed = await compare(
      "123456@",
      user.password_hash,
    );

    expect(isPasswordCorrectlyHashed).toBe(true);
  });

  it("Should not be able to register with same email twice", async () => {
    await sut.execute({
      name: "Pedro A.",
      email: "pedro@pedro.com",
      password: "123456@",
      city: "SJC",
      cod_city: "0101",
      cod_state: "SP",
      state: "0202",
      telephone: "1297854515",
    });

    await expect(() => {
      return sut.execute({
        name: "Pedro A.",
        email: "pedro@pedro.com",
        password: "123456@",
        city: "SJC",
        cod_city: "0101",
        cod_state: "SP",
        state: "0202",
        telephone: "1297854515",
      });
    }).rejects.toBeInstanceOf(UserAlreadyExistError);
  });
});
