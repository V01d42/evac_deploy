import { z } from 'zod';

export const ItemSchema = z.object({
  food: z.number(),
  water: z.number(),
  blanket: z.number(),
  phone: z.number(),
  flashlight: z.number(),
  television: z.number(),
  fan: z.number(),
  generator: z.number(),
  tent: z.number(),
  heatPack: z.number(),
  megaphone: z.number(),
});

export type Item = z.infer<typeof ItemSchema>;

export const parseItem = (value: unknown): Item => ItemSchema.parse(value);
