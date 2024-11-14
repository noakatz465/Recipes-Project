// src/app/api/routes/recipes/post/route.ts
import connect from '@/app/lib/db/mongoDB';
import Recipe from '@/app/lib/models/RecipeSchema';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    await connect();

    const data = await req.json();
    console.log(data); // לבדוק מה מועבר בבקשה

    const { categoryId, description, mealName, img, instructions, isFavorite, ingredients } = data;

    const newRecipe = new Recipe({
      categoryId,
      description,
      mealName,
      img,
      instructions,
      isFavorite,
      ingredients,
    });

    await newRecipe.save(); // שומרים את המתכון החדש במסד הנתונים

    return NextResponse.json({
      message: 'Recipe added successfully',
      newRecipe: {
        _id: newRecipe._id,
        categoryId: newRecipe.categoryId,
        description: newRecipe.description,
        mealName: newRecipe.mealName,
        img: newRecipe.img,
        instructions: newRecipe.instructions,
        isFavorite: newRecipe.isFavorite,
        ingredients: newRecipe.ingredients,
      },
    });
  } catch (error) {
    console.error('Error adding recipe:', error);
    return NextResponse.json({ message: 'Error adding recipe', error: error }, { status: 500 });
  }
}

