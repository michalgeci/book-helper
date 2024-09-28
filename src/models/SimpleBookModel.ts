import { z } from "zod";

export const simpleBookModelSchema = z.array(z.array(z.string()));

export type SimpleBookModel = z.infer<typeof simpleBookModelSchema>;
