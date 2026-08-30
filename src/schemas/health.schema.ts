import { z } from "zod";

export const healthSchema = z.object({
  name: z.string().min(1)
});