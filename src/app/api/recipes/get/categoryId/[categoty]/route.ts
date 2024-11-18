import connect from '@/app/lib/db/mongoDB';
import Recipe from '@/app/lib/models/RecipeSchema';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const categoryId = req.url.split('/').pop();

  try {
    await connect();
    const recipes = await Recipe.find({ categoryId });

    if (!recipes || recipes.length === 0) {
      return NextResponse.json({ message: 'No recipes found for this category' }, { status: 404 });
    }

    return NextResponse.json({
      message: 'Recipes fetched successfully by category ID',
      recipes: recipes.map(recipe => ({
        _id: recipe._id,
        categoryId: recipe.categoryId,
        description: recipe.description,
        mealName: recipe.mealName,
        img: recipe.img,
        instructions: recipe.instructions,
        isFavorite: recipe.isFavorite,
        ingredients: recipe.ingredients,
      })),
    });
  } catch (error) {
    return NextResponse.json({ message: 'Error fetching recipes by category ID', error: error }, { status: 500 });
  }
}
