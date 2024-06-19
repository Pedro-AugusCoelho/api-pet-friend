import { FastifyInstance } from "fastify";

import { verifyJwt } from "../../../http/middlewares/verify-jwt";
import { createPet } from "./create";
import { searchManyPets } from "./search-many";
import { searchUniquePet } from "./search-unique";

export async function petsRoutes(app: FastifyInstance) {
  app.get("/pet", searchUniquePet);
  app.get("/pets", searchManyPets);

  /* Authenticated */
  app.post("/pet", { onRequest: [verifyJwt] }, createPet);
}
