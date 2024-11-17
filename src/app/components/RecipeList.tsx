'use client';

import React, { useEffect } from 'react';
import Recipe from './Recipe'; // Import the Recipe component
import { RecipeModel } from '../models/recipeModel';
import useRecipeStore from '../stores/recipeStore';

function RecipeList() {
  const { recipes, loading, error, fetchData } = useRecipeStore();

  useEffect(() => {
    fetchData(); // Fetch data when component mounts
  }, [fetchData]);

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
          recipes.map((recipe: RecipeModel) => {
            return <Recipe key={recipe._id} recipe={recipe} />;
          })
        )}
      </div>
    </div>
  );
}

export default RecipeList;
