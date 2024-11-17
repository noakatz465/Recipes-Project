'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import RecipeView from '@/app/components/RecipeView';

function page() {
  const params = useParams(); // Get all params
  const { recipeId } = params || {}; // Extract 'id'

  if (!recipeId || typeof recipeId !== 'string') {
    return <div className="text-center text-gray-500">Invalid recipe ID</div>;
  }

  return <RecipeView recipeId={recipeId} />;
}

export default page;
