'use client';

import React from 'react';
import Link from 'next/link';
import RecipeModel from '../models/recipeModel';

interface RecipeProps {
  recipe: RecipeModel;
}

const Recipe: React.FC<RecipeProps> = ({ recipe }) => {
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
          {recipe.isFavorite && (
            <span className="text-yellow-500 text-xl" title="Favorite Recipe">
              ★
            </span>
          )}
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
