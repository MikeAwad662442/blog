import { z } from "zod";

// ================= //
// Job Filter Schema //
// ================= //
export const jobFilterSchema = z.object({
  searchInput: z.string().optional(), // .optional() = it could be undefined
  type: z.string().optional(),
  location: z.string().optional(),
  remote: z.coerce.boolean().optional(),
});
// zod help to make type from schema to typescript 😄 🏆
export type JobFilterValue = z.infer<typeof jobFilterSchema>;
// ================= //
// Job Filter Schema //
// ================= //
