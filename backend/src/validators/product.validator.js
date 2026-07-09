import { z } from "zod";

export const productsQuerySchema = z.object({
  body: z.object({}).passthrough(),
  params: z.object({}).passthrough(),
  query: z.object({
    search: z.string().optional().default(""),
    category: z.string().optional().default(""),
    limit: z.coerce.number().int().positive().max(100).optional().default(12),
    skip: z.coerce.number().int().min(0).optional().default(0),
  }),
});

export const productIdSchema = z.object({
  body: z.object({}).passthrough(),
  params: z.object({
    id: z.string().min(1, "id is required"),
  }),
  query: z.object({}).passthrough(),
});
