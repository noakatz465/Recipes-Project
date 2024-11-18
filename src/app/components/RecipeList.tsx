'use client';

import React, { useEffect } from 'react';
import Recipe from './Recipe'; // Import the Recipe component
import useRecipeStore from '../stores/recipeStore';
import RecipeModel from '../models/recipeModel';

function RecipeList() {
  const { filteredRecipes, error, fetchData ,resetFilters} = useRecipeStore();

  useEffect(() => {
    resetFilters(); // איפוס המסננים בעת טעינת הדף
    fetchData(); 
  }, [fetchData]);

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="recipe-list p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredRecipes.map((recipe: RecipeModel) => {
          return <Recipe key={recipe._id} recipe={recipe} />;
        })}
      </div>
    </div>
  );
}

export default RecipeList;
