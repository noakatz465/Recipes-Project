'use client';
import React, { useEffect } from 'react';
import Recipe from './Recipe';
import useRecipeStore from '../stores/recipeStore';

function Favourites() {
  const { favoriteRecipes, loading, error, fetchData } = useRecipeStore();

  useEffect(() => {
    if (favoriteRecipes.length === 0) {
      fetchData(); // Fetch data if favorite recipes are not loaded
    }
  }, [fetchData, favoriteRecipes.length]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="recipe-list p-4">
      <h1 className="text-2xl font-bold mb-6">Favorite Recipes</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {favoriteRecipes.length === 0 ? (
          <div>No favorite recipes to display</div>
        ) : (
          favoriteRecipes.map((recipe) => <Recipe key={recipe._id} recipe={recipe} />)
        )}
      </div>
    </div>
  );
}

export default Favourites;
