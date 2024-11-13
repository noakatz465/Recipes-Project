// src/app/api/routes/recipes/update/[recipeId]/route.ts
import connect from '@/app/lib/db/mongoDB';
import Recipe from '@/app/lib/models/RecipeSchema';
import { NextResponse } from 'next/server';

export async function PUT(req: Request, { params }: { params: { recipeId: string } }) {
  try {
    await connect();

    const { recipeId } = params;
    const { description, mealName, img, instructions } = await req.json();

    const recipe = await Recipe.findById(recipeId);
    if (!recipe) {
      return NextResponse.json({ message: 'Recipe not found' }, { status: 404 });
    }

    recipe.description = description;
    recipe.mealName = mealName;
    recipe.img = img;
    recipe.instructions = instructions;

    const updatedRecipe = await recipe.save();

    return NextResponse.json({
      message: 'Recipe updated successfully',
      updatedRecipe,
    });
  } catch (error) {
    return NextResponse.json({ message: 'Error updating recipe', error: error }, { status: 500 });
  }
}
