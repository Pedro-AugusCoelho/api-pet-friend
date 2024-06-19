import { FastifyInstance } from "fastify";

import { verifyJwt } from "../../../http/middlewares/verify-jwt";
import { createPet } from "./create-pet";

export async function usersRoutes(app: FastifyInstance) {
  /* Authenticated */
  app.post("/pet", { onRequest: [verifyJwt] }, createPet);
}
