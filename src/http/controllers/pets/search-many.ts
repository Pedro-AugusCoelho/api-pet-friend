import { RequiredCodCity } from "@/use-cases/errors/required-cod-city";
import { makeSearchManyPetsUseCase } from "@/use-cases/factories/make-search-many-pets-use-case";
import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";

export async function searchManyPets(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const searchManyPetsBodySchema = z.object({
    name: z.string(),
    energy: z.enum(["BAIXA", "MEDIA", "ALTA"]),
    codCity: z.string(),
    page: z.number(),
  });

  const { name, energy, codCity, page } = searchManyPetsBodySchema.parse(
    request.body,
  );

  try {
    const searchManyPetstUseCase = makeSearchManyPetsUseCase();

    const pets = await searchManyPetstUseCase.execute({
      name,
      energy,
      codCity,
      page,
    });

    return reply.status(201).send({ pets });
  } catch (err) {
    if (err instanceof RequiredCodCity) {
      return reply.status(409).send({ message: err.message });
    }

    throw err;
  }
}
