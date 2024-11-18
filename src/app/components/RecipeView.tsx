'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import RecipeModel from '@/app/models/recipeModel';

interface RecipeViewProps {
  recipe: RecipeModel; // האובייקט שמועבר לפרופס
  onClose?: () => void; // פונקציה  לסגירה
}

const RecipeView: React.FC<RecipeViewProps> = ({ recipe, onClose }) => {
  const router = useRouter(); 

  // ניתוב חזרה לרשימת המתכונים או סגירת הדיאלוג
  const handleClose = () => {
    if (onClose) {
      onClose();
    } else {
      router.push('/pages/recipeList'); 
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-700 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-2xl shadow-lg max-w-4xl w-full p-6 relative overflow-y-auto max-h-[90vh]">
        {/* כפתור סגירה */}
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl"
          onClick={handleClose}
        >
          &times;
        </button>

        {/* פרטי המתכון */}
        <img
          className="w-full h-64 object-cover rounded-md mb-4"
          src={recipe.img}
          alt={recipe.mealName}
        />
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
        <p className="text-gray-700 whitespace-pre-line">{recipe.instructions}</p>
      </div>
    </div>
  );
};

export default RecipeView;
