import connect from '@/app/lib/db/mongoDB';
import Recipe from '@/app/lib/models/RecipeSchema';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  try {
    await connect();

    const favoriteRecipes = await Recipe.find({ isFavorite: true });

    return NextResponse.json({
      message: 'Favorite recipes fetched successfully',
      recipes: favoriteRecipes.map(recipe => ({
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
    return NextResponse.json({ message: 'Error fetching favorite recipes', error: error });
  }
}
