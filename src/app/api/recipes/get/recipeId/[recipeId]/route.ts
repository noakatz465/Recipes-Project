import connect from '@/app/lib/db/mongoDB';
import Recipe from '@/app/lib/models/RecipeSchema';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const recipeId = req.url.split('/').pop(); 

  try {
    await connect();
    const recipe = await Recipe.findById(recipeId);

    if (!recipe) {
      return NextResponse.json({ message: 'Recipe not found' }, { status: 404 });
    }

    return NextResponse.json({
      message: 'Recipe fetched successfully',
      recipe: {
        _id: recipe._id,
        categoryId: recipe.categoryId,
        description: recipe.description,
        mealName: recipe.mealName,
        img: recipe.img,
        instructions: recipe.instructions,
        isFavorite: recipe.isFavorite,
        ingredients: recipe.ingredients,
      },
    });
  } catch (error) {
    return NextResponse.json({ message: 'Error fetching recipe by ID', error: error }, { status: 500 });
  }
}
