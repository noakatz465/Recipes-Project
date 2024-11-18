'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import RecipeView from '@/app/components/RecipeView';
import RecipeModel from '@/app/models/recipeModel';
import useRecipeStore from '@/app/stores/recipeStore';

const RecipePage: React.FC = () => {
  const { recipeId } = useParams();
  const { recipes } = useRecipeStore(); // שליפת כל המתכונים מהחנות

  if (!recipeId || typeof recipeId !== 'string') {
    return <div className="text-center text-gray-500">Invalid recipe ID</div>;
  }

  // חיפוש המתכון בחנות לפי ID
  const recipe: RecipeModel | undefined = recipes.find((r) => r._id === recipeId);

  if (!recipe) {
    return <div className="text-center text-gray-500">Recipe not found</div>;
  }

  return (
    <div className="p-4">
      <RecipeView recipe={recipe} />
    </div>
  );
};

export default RecipePage;
