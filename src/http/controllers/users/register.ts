import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";
import { UserAlreadyExistError } from "@/use-cases/errors/user-already-exist";
import { makeRegisterUseCase } from "@/use-cases/factories/make-register-use-case";

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string(),
    password: z.string().min(6),
    city: z.string(),
    cod_city: z.string(),
    cod_state: z.string(),
    state: z.string(),
    telephone: z.string(),
  });

  const { email, name, password, city, cod_city, cod_state, state, telephone } =
    registerBodySchema.parse(request.body);

  try {
    const registerUseCase = makeRegisterUseCase();

    await registerUseCase.execute({
      name,
      email,
      password,
      city,
      cod_city,
      cod_state,
      state,
      telephone,
    });
  } catch (err) {
    if (err instanceof UserAlreadyExistError) {
      return reply.status(409).send({ message: err.message });
    }

    throw err;
  }

  return reply.status(201).send();
}
