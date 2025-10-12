import { defineCollection, z } from "astro:content";

export const collections = {
  recipes: defineCollection({
    schema: z.object({
      title: z.string(),
      image: z.string().optional(),
      prepTime: z.string().optional(),
      cookTime: z.string().optional(),
      totalTime: z.string().optional(),
      servings: z.string().optional(),
      tags: z.array(z.string()).default([]),
      date: z.date().default(() => new Date()),
      difficulty: z.enum(["Easy", "Medium", "Hard"]).optional(),
      temperature: z.string().optional(),
    }),
  }),
};
