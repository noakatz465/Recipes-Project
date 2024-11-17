'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'; // Import useRouter
import RecipeModel from '@/app/models/recipeModel';
import { getRecipeById } from '@/app/services/recipesService';

interface RecipeViewProps {
  recipeId: string;
  onClose?: () => void; // Optional function to close the dialog
}

const RecipeView: React.FC<RecipeViewProps> = ({ recipeId }) => {
  const [recipe, setRecipe] = useState<RecipeModel | null>(null);
  const router = useRouter(); // Initialize the Next.js router

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

  // Navigate back to the recipesList page
  const handleClose = () => {
    router.push('/pages/recipeList'); // Navigate to the recipeList page
  };

  if (!recipe) {
    return <div className="text-center text-gray-500">Loading...</div>;
  }

  return (
    <div className="fixed inset-0 bg-gray-700 bg-opacity-50 flex justify-center items-center z-50">
      <div
        className="bg-white rounded-2xl shadow-lg max-w-4xl w-full p-6 relative overflow-y-auto max-h-[90vh]">
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl"
          onClick={handleClose}>
          &times;
        </button>
        <img
          className="w-full h-64 object-cover rounded-md mb-4"
          src={recipe.img}
          alt={recipe.mealName} />
        <h1 className="text-3xl font-bold mb-2">{recipe.mealName}</h1>
        <p className="text-gray-500 text-sm mb-4">{recipe.categoryName || 'Unknown Category'}</p>
        <p className="text-gray-700 text-lg mb-4">{recipe.description}</p>
        <h2 className="text-2xl font-semibold mb-2">Ingredients:</h2>
        <ul className="list-disc list-inside mb-4">
          {recipe.ingredients.map((ingredient, index) => (
            <li key={index} className="text-gray-700">
              {ingredient}
            </li>
          ))}
        </ul>
        <h2 className="text-2xl font-semibold mb-2">Instructions:</h2>
        <p className="text-gray-700">{recipe.instructions}</p>
      </div>
    </div>
  );
};

export default RecipeView;
