import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";
import { makeCreatePetUseCase } from "@/use-cases/factories/make-create-pet-use-case";

export async function createPet(request: FastifyRequest, reply: FastifyReply) {
  const createPetBodySchema = z.object({
    name: z.string(),
    about: z.string(),
    year: z.number(),
    size: z.number(),
    energy: z.enum(["BAIXA", "MEDIA", "ALTA"]),
    independence: z.enum(["BAIXA", "MEDIA", "ALTA"]),
    environment: z.enum(["PEQUENO", "MEDIO", "AMPLO"]),
  });

  const createPetParamsSchema = z.object({
    userId: z.string().uuid(),
  });

  const { name, about, energy, environment, independence, size, year } =
    createPetBodySchema.parse(request.body);

  const { userId } = createPetParamsSchema.parse(request.params);

  try {
    const createPetUseCase = makeCreatePetUseCase();

    await createPetUseCase.execute({
      name,
      about,
      energy,
      environment,
      independence,
      userId,
      size,
      year,
    });
  } catch (err) {
    // if (err instanceof UserAlreadyExistError) {
    //   return reply.status(409).send({ message: err.message });
    // }
    // throw err;
  }

  return reply.status(201).send();
}
