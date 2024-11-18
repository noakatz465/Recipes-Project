'use client';
import React, { useEffect, useState } from 'react';
import { recipeSchema } from '../zod/recipeSchema';
import { addRecipe } from '../services/recipesService';
import useRecipeStore from '../stores/recipeStore';
import RecipeModel from '../models/recipeModel';
import { ZodError } from 'zod';
import { useRouter } from 'next/navigation';

function AddRecipe() {
  const [categoryId, setCategoryId] = useState('');
  const [description, setDescription] = useState('');
  const [mealName, setMealName] = useState('');
  const [img, setImg] = useState('');
  const [instructions, setInstructions] = useState('');
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [newIngredient, setNewIngredient] = useState('');
  const [isFavorite, setIsFavorite] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const router = useRouter();

  const { categories, error, fetchData } = useRecipeStore();

  // שליפת נתונים בעת טעינת הרכיב
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // פונקציה לטיפול בשליחת הטופס
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({}); // איפוס הודעות שגיאה לפני אימות

    try {
      const newRecipeData = new RecipeModel({
        categoryId,
        description,
        mealName,
        img,
        instructions,
        isFavorite,
        ingredients,
      });

      // אימות הנתונים באמצעות Zod
      recipeSchema.parse(newRecipeData);

      // שליחת המתכון אם האימות מצליח
      await addRecipe(newRecipeData);
      router.push('/pages/recipeList');
    } catch (err) {
      if (err instanceof ZodError) {
        // מיפוי שגיאות Zod למצב ההודעות
        const fieldErrors: Record<string, string> = {};
        err.errors.forEach((error) => {
          if (error.path.length > 0) {
            fieldErrors[error.path[0]] = error.message;
          }
        });
        setErrors(fieldErrors);
      } else {
        console.log(err);
      }
    }
  };

  // הוספת רכיב חדש לרשימת הרכיבים
  const handleAddIngredient = () => {
    if (newIngredient.trim() !== '') {
      setIngredients((prev) => [...prev, newIngredient.trim()]);
      setNewIngredient('');
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
          {errors.mealName && <p className="text-red-500 text-sm mt-1">{errors.mealName}</p>}
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
          {errors.categoryId && <p className="text-red-500 text-sm mt-1">{errors.categoryId}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            className="w-full mt-1 p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-purple-500 focus:border-purple-500"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
          {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Image URL</label>
          <input
            type="text"
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
          {errors.instructions && <p className="text-red-500 text-sm mt-1">{errors.instructions}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Ingredients</label>
          <div className="flex items-center gap-2">
            <input
              type="text"
              className="flex-grow mt-1 p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-purple-500 focus:border-purple-500"
              placeholder="Ingredient"
              value={newIngredient}
              onChange={(e) => setNewIngredient(e.target.value)}
            />
            <button
              type="button"
              onClick={handleAddIngredient}
              className="bg-purple-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-purple-600"
            >
              +
            </button>
          </div>
          <ul className="mt-2 space-y-1">
            {ingredients.map((ingredient, index) => (
              <li key={index} className="flex items-center gap-2">
                <input
                  type="text"
                  value={ingredient}
                  className="flex-grow p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-purple-500 focus:border-purple-500"
                  onChange={(e) => {
                    const updatedIngredients = [...ingredients];
                    updatedIngredients[index] = e.target.value;
                    setIngredients(updatedIngredients);
                  }}
                />
                <button
                  type="button"
                  onClick={() => {
                    const updatedIngredients = ingredients.filter((_, i) => i !== index);
                    setIngredients(updatedIngredients);
                  }}
                  className="bg-red-500 text-white px-2 py-1 rounded-lg shadow-md hover:bg-red-600"
                >
                  X
                </button>
              </li>
            ))}
          </ul>
          {errors.ingredients && <p className="text-red-500 text-sm mt-1">{errors.ingredients}</p>}
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
          className="w-full bg-purple-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-purple-600 focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 mt-4 block text-center"
        >
          Add Recipe
        </button>
      </form>

      {error && <p className="text-red-500 mt-4">{error}</p>}
    </div>
  );
}

export default AddRecipe;
