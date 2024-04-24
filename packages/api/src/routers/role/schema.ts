import z from "zod";

const roleBaseSchema = z.object({
  id: z.number(),
  role_name: z.string(),
});

export { roleBaseSchema };
