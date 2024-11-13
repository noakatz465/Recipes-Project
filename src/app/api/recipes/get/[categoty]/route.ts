import connect from '@/app/lib/db/mongoDB';
import Recipe from '@/app/lib/models/RecipeSchema';
import { NextResponse } from 'next/server';

export async function GET(req: Request, { params }: { params: { categoryId: string } }) {
  try {
    await connect();

    const { categoryId } = params;
    const recipes = await Recipe.find({ categoryId });

    return NextResponse.json({
      message: 'Recipes fetched successfully by category ID',
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
    return NextResponse.json({ message: 'Error fetching recipes by category ID', error: error });
  }
}
