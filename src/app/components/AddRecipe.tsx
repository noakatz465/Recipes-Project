'use client';
import React, { useEffect, useState } from 'react';
import { recipeSchema } from '../zod/recipeSchema';
import { addRecipe } from '../services/recipesService';
import useRecipeStore from '../stores/recipeStore';

function AddRecipe() {
  const [categoryId, setCategoryId] = useState('');
  const [categoryName, setCategoryName] = useState('');
  const [description, setDescription] = useState('');
  const [mealName, setMealName] = useState('');
  const [img, setImg] = useState('');
  const [instructions, setInstructions] = useState('');
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [isFavorite, setIsFavorite] = useState(false);

  // קריאה לסטור כדי לקבל את הקטגוריות
  const { categories, error, fetchData } = useRecipeStore();

  // קריאה ל-fetchData פעם אחת כשהרכיב נטען
  useEffect(() => {
    fetchData();
  }, [fetchData]); // תוודא ש-fetchData יופעל רק פעם אחת


  const handleSubmit = async (e: React.FormEvent) => {
    
    e.preventDefault();

    try {
      const newRecipeData = {
        categoryId, categoryName, description, mealName, img, instructions, isFavorite, ingredients,
      };
      console.log(newRecipeData);
      recipeSchema.parse(newRecipeData);

      await addRecipe(newRecipeData);
      alert('Recipe added successfully!');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Add Recipe</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Meal Name</label>
          <input
            type="text"
            className="w-full mt-1 p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-purple-500 focus:border-purple-500"
            placeholder="Meal Name"
            value={mealName}
            onChange={(e) => setMealName(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Category</label>
          <select
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            className="w-full mt-1 p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-purple-500 focus:border-purple-500"
          >
            <option value="">Select Category</option>
            {categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            className="w-full mt-1 p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-purple-500 focus:border-purple-500"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Image URL</label>
          <input
            type="url"
            className="w-full mt-1 p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-purple-500 focus:border-purple-500"
            placeholder="Image URL"
            value={img}
            onChange={(e) => setImg(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Instructions</label>
          <textarea
            className="w-full mt-1 p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-purple-500 focus:border-purple-500"
            placeholder="Instructions"
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
          ></textarea>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Ingredients</label>
          <input
            type="text"
            className="w-full mt-1 p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-purple-500 focus:border-purple-500"
            placeholder="Ingredients (comma-separated)"
            value={ingredients.join(', ')}
            onChange={(e) =>
              setIngredients(e.target.value.split(',').map((ingredient) => ingredient.trim()))
            }
          />
        </div>

        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            className="w-4 h-4 text-purple-500 border-gray-300 rounded focus:ring-purple-500"
            checked={isFavorite}
            onChange={(e) => setIsFavorite(e.target.checked)}
          />
          <label className="text-sm font-medium text-gray-700">Mark as Favorite</label>
        </div>

        <button
          type="submit"
          className="w-full bg-purple-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-purple-600 focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
        >
          Add Recipe
        </button>
      </form>

      {error && <p className="text-red-500 mt-4">{error}</p>}
    </div>
  );
}

export default AddRecipe;
