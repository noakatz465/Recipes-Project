import React from 'react';
import RecipeModel from '../models/recipeModel';

interface RecipeProps {
  recipe: RecipeModel; 
}

const Recipe: React.FC<RecipeProps> = ({ recipe }) => {
  return (
    <div className="max-w-xs rounded-2xl overflow-hidden shadow-lg bg-white border border-gray-200 flex flex-col">
      <img className="w-full h-48 object-cover" src={recipe.img} alt={recipe.mealName} />
      <div className="p-4 flex flex-col flex-grow">
        <div className="flex justify-between items-center mb-2">
          <h2 className="font-bold text-lg">{recipe.mealName}</h2>
          {recipe.isFavorite && <span className="text-yellow-500 text-xl">★</span>}
        </div>
        <p className="text-gray-500 text-sm mb-2">{recipe.categoryName || "Category"}</p>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2 flex-grow">
          {recipe.description || "Short instructions description..."}
        </p>
        <div className="mt-auto">
          <button className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded-lg w-full">
            Read more
          </button>
        </div>
      </div>
    </div>
  );
};

export default Recipe;
