import { z } from "zod";

export const loginSchema = z.object({
  body: z.object({
    username: z.string().min(1, "username is required"),
    password: z.string().min(1, "password is required"),
  }),
  params: z.object({}).passthrough(),
  query: z.object({}).passthrough(),
});
