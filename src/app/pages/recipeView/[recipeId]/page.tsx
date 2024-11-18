'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import RecipeView from '@/app/components/RecipeView';
import RecipeModel from '@/app/models/recipeModel';

const RecipePage: React.FC = () => {
  const { recipeId } = useParams();
  const searchParams = useSearchParams();
  const [recipe, setRecipe] = useState<RecipeModel | null>(null);

  useEffect(() => {
    if (!recipeId || typeof recipeId !== 'string') {
      console.error('Invalid recipe ID');
      return;
    }

    // קבלת האובייקט דרך query
    const recipeData = searchParams.get('recipe');
    if (recipeData) {
      try {
        const parsedRecipe = JSON.parse(recipeData);
        setRecipe(parsedRecipe);
      } catch (error) {
        console.error('Failed to parse recipe data:', error);
      }
    } else {
      console.error('No recipe data found in query parameters');
    }
  }, [recipeId, searchParams]);

  if (!recipe) {
    return <div className="text-center text-gray-500">Loading recipe...</div>;
  }

  return (
    <div className="p-4">
      <RecipeView recipe={recipe} />
    </div>
  );
};

export default RecipePage;
