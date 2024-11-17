import { z } from 'zod';

export const recipeSchema = z.object({
  categoryId: z.string().min(1, 'Category is required'),
  mealName: z.string().min(1, 'Meal name is required'),
  description: z.string().min(3, 'Description must be at least 3 characters long'),
  instructions: z.string().min(3, 'Instructions must be at least 3 characters long'),
  ingredients: z.array(z.string()).min(1, 'At least one ingredient is required'),
  isFavorite: z.boolean(),
});