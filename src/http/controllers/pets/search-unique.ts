import { makeSearchUniquePetsUseCase } from "@/use-cases/factories/make-search-unique-pet-use-case";
import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";

export async function searchUniquePet(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const searchUniquePetsBodySchema = z.object({
    id: z.string().uuid(),
  });

  const { id } = searchUniquePetsBodySchema.parse(request.params);

  try {
    const searchUniquePetstUseCase = makeSearchUniquePetsUseCase();

    const pet = await searchUniquePetstUseCase.execute({
      id,
    });

    return reply.status(201).send({ pet });
  } catch (err) {
    //   if (err instanceof RequiredCodCity) {
    //     return reply.status(409).send({ message: err.message });
    //   }
    //   throw err;
  }
}
