import { z } from "zod";
export const createFarmSchema = z.object({
  name: z
    .string({ error: "Farm name is required." })
    .trim()
    .min(2, "Farm name must be at least 2 characters.")
    .max(100, "Farm name must be at most 100 characters."),

  location: z
    .string({ error: "Location is required." })
    .trim()
    .min(1, "Location cannot be empty."),

  size: z
    .number({ error: "Size is required." })
    .positive("Size must be greater than 0."),

  soilType: z.string().trim().nullable().optional(),

  climate: z.string().trim().nullable().optional(),
});

export const updateFarmSchema = createFarmSchema.partial();

export type CreateFarmInput = z.infer<typeof createFarmSchema>;
export type UpdateFarmInput = z.infer<typeof updateFarmSchema>;
