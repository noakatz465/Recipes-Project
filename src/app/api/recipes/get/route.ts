import connect from '@/app/lib/db/mongoDB';
import Recipe from '@/app/lib/models/RecipeSchema';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  try {
    await connect();

    const recipes = await Recipe.find();

    return NextResponse.json({
      message: 'Recipes fetched successfully',
      recipes: recipes.map(recipe => ({
        _id: recipe._id,
        categoryId: recipe.categoryId,
        description: recipe.description,
        mealName: recipe.mealName,
        img: recipe.img,
        instructions: recipe.instructions,
      })),
    });
  } catch (error) {
    return NextResponse.json({ message: 'Error fetching recipes', error: error });
  }
}
