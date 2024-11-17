// src/app/api/routes/recipes/update/[recipeId]/route.ts
import connect from '@/app/lib/db/mongoDB';
import Recipe from '@/app/lib/models/RecipeSchema';
import { NextResponse } from 'next/server';

export async function PUT(req: Request, { params }: { params: { recipeId: string } }) {
  try {
    await connect();

    const { recipeId } = params;

    // קבל את כל השדות מהבקשה
    const { description, mealName, img, instructions, isFavorite } = await req.json();

    // מצא את המתכון לפי ID
    const recipe = await Recipe.findById(recipeId);
    if (!recipe) {
      return NextResponse.json({ message: 'Recipe not found' }, { status: 404 });
    }

    // עדכן את הערכים במתכון
    recipe.description = description;
    recipe.mealName = mealName;
    recipe.img = img;
    recipe.instructions = instructions;
    if (isFavorite !== undefined) {
      recipe.isFavorite = isFavorite; // עדכון isFavorite אם הוא קיים בבקשה
    }

    // שמור את העדכון ב-Database
    const updatedRecipe = await recipe.save();

    return NextResponse.json({
      message: 'Recipe updated successfully',
      updatedRecipe,
    });
  } catch (error) {
    console.error('Error updating recipe:', error);
    return NextResponse.json({ message: 'Error updating recipe', error: error }, { status: 500 });
  }
}
