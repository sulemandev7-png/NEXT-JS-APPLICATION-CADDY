import { z } from "zod";

export const cartUserSchema = z.object({
  body: z.object({}).passthrough(),
  params: z.object({
    userId: z.string().min(1, "userId is required"),
  }),
  query: z.object({}).passthrough(),
});

export const addCartItemSchema = z.object({
  body: z.object({
    userId: z.union([z.string(), z.number()]).transform(String),
    id: z.union([z.string(), z.number()]).transform((value) => Number(value)),
    title: z.string().min(1),
    price: z.number().nonnegative(),
    quantity: z.number().int().positive(),
    discountPercentage: z.number().nonnegative().optional(),
    discountedPrice: z.number().nonnegative().optional(),
    thumbnail: z.string().optional(),
  }),
  params: z.object({}).passthrough(),
  query: z.object({}).passthrough(),
});

export const updateCartItemSchema = z.object({
  body: z.object({
    userId: z.union([z.string(), z.number()]).transform(String),
    itemId: z.union([z.string(), z.number()]).transform((value) => Number(value)),
    quantity: z.number().int().positive(),
  }),
  params: z.object({}).passthrough(),
  query: z.object({}).passthrough(),
});
