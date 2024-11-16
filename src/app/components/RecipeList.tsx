'use client';

import React, { useState, useEffect } from 'react';
import { getAllRecipes } from '../services/recipesService';
import Recipe from './Recipe'; // Import the Recipe component
import RecipeModel from '../models/recipeModel';
import { CategoryModel } from '../models/categoryModel';
import { getAllCategories } from '../services/categoryService';

function RecipeList() {
  const [recipes, setRecipes] = useState<RecipeModel[]>([]);
  const [categories, setCategories] = useState<CategoryModel[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch categories
        const fetchedCategories = await getAllCategories();
        const categoryObjects = fetchedCategories.map(
          (category: any) => new CategoryModel(category._id, category.name)
        );
        setCategories(categoryObjects);

        // Fetch recipes and map to RecipeModel with categoryName
        const fetchedRecipes = await getAllRecipes();
        const recipeObjects = fetchedRecipes.map((data: any) => {
          const category = categoryObjects.find((cat: { _id: any; }) => cat._id === data.categoryId);
          return new RecipeModel({
            ...data,
            categoryName: category ? category.name : 'Unknown', // Assign category name
          });
        });
        setRecipes(recipeObjects);
      } catch (error) {
        setError('Failed to fetch data');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="recipe-list p-4">
      <h1 className="text-2xl font-bold mb-6">All recipes</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {recipes.length === 0 ? (
          <div>No recipes to display</div>
        ) : (
          recipes.map((recipe) => (
            <Recipe key={recipe._id} recipe={recipe} />
          ))
        )}
      </div>
    </div>
  );
}

export default RecipeList;
