'use client';

import React from 'react';
import Link from 'next/link';
import RecipeModel from '../models/recipeModel';
import useRecipeStore from '../stores/recipeStore';

interface RecipeProps {
  recipe: RecipeModel;
}

const Recipe: React.FC<RecipeProps> = ({ recipe }) => {
  const { toggleFavorite } = useRecipeStore(); // פונקציה לעדכון מועדף

  const handleFavoriteToggle = async () => {
    try {
      await toggleFavorite(recipe); // עדכון מועדף בחנות
    } catch (error) {
      console.error('Failed to toggle favorite:', error);
    }
  };

  return (
    <div className="max-w-xs rounded-2xl overflow-hidden shadow-lg bg-white border border-gray-200 flex flex-col">
      <img
        className="w-full h-48 object-cover rounded-t-2xl"
        src={recipe.img}
        alt={recipe.mealName}
      />
      <div className="p-4 flex flex-col flex-grow">
        <div className="flex justify-between items-center mb-2">
          <h2 className="font-bold text-lg text-gray-800">{recipe.mealName}</h2>
          <button
            onClick={handleFavoriteToggle} // הוספת אירוע לחיצה
            className={recipe.isFavorite ? 'w-6 h-6' : 'w-5 h-5'} 
            title={recipe.isFavorite ? 'Favorite Recipe' : 'Not Favorite'}>
            {recipe.isFavorite ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="#FFC107"
                className="w-full h-full"
              >
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#FFC107"
                strokeWidth="2"
                className="w-full h-full"
              >
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
              </svg>
            )}
          </button>
        </div>
        <p className="text-gray-500 text-sm mb-2">{recipe.categoryName || 'Category'}</p>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2 flex-grow whitespace-pre-line">
          {recipe.description || 'Short instructions description...'}
        </p>
        <div className="mt-auto">
          <Link
            href={`/pages/recipeView/${recipe._id}`}
            className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded-lg w-full text-center block"
          >
            Read more
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Recipe;
