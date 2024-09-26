import { z } from "zod";

export const bookModelSchema = z.object(
  {
    title: z.string(),
    author: z.string(),
    chapters: z.array(z.object({
      title: z.string(),
      originalParagraphs: z.array(z.string()),
      translatedParagraphs: z.array(z.array(z.string()))
    }))
  }
)

export type BookModel = z.infer<typeof bookModelSchema>;
