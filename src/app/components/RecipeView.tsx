'use client';

import React, { useEffect, useState } from 'react';
import RecipeModel from '@/app/models/recipeModel';
import { getRecipeById } from '@/app/services/recipesService';

interface RecipeViewProps {
  recipeId: string;
}

const RecipeView: React.FC<RecipeViewProps> = ({ recipeId }) => {
  const [recipe, setRecipe] = useState<RecipeModel | null>(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const data = await getRecipeById(recipeId); // Fetch recipe by ID
        setRecipe(new RecipeModel(data)); // Convert data to RecipeModel
      } catch (error) {
        console.error('Error fetching recipe:', error);
      }
    };
    fetchRecipe();
  }, [recipeId]);

  if (!recipe) {
    return <div className="text-center text-gray-500">Loading...</div>;
  }

  return (
    <div className="fixed inset-0 bg-gray-700 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white rounded-2xl shadow-lg max-w-4xl w-full p-8">
        <img
          className="w-full h-64 object-cover rounded-md mb-4"
          src={recipe.img}
          alt={recipe.mealName}
        />
        <h1 className="text-2xl font-bold mb-2">{recipe.mealName}</h1>
        <p className="text-gray-500 text-sm mb-4">{recipe.categoryName || 'Unknown Category'}</p>
        <p className="text-gray-700 text-lg mb-4">{recipe.description}</p>
        <h2 className="text-xl font-semibold mb-2">Ingredients:</h2>
        <ul className="list-disc list-inside mb-4">
          {recipe.ingredients.map((ingredient, index) => (
            <li key={index}>{ingredient}</li>
          ))}
        </ul>
        <h2 className="text-xl font-semibold mb-2">Instructions:</h2>
        <p className="text-gray-700">{recipe.instructions}</p>
      </div>
    </div>
  );
};

export default RecipeView;
