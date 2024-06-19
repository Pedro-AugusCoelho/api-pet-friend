import fastifyJwt from "@fastify/jwt";
import fastify from "fastify";
import { env } from "./env";
import fastifyCookie from "@fastify/cookie";
import { ZodError } from "zod";
import { usersRoutes } from "./http/controllers/users/routes";
import { petsRoutes } from "./http/controllers/pets/routes";

export const app = fastify();

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  cookie: {
    cookieName: "refreshToken",
    signed: false,
  },
  sign: {
    expiresIn: "10m",
  },
});

app.register(fastifyCookie);

app.register(usersRoutes);
app.register(petsRoutes);

app.setErrorHandler((err, _, reply) => {
  if (err instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: "Validation error.", issues: err.format() });
  }

  if (env.NODE_ENV !== "production") {
    console.error(err);
  } else {
    //
  }

  return reply.status(500).send({ message: "Internal server error" });
});
