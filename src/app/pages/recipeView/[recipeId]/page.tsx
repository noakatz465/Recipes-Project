'use client';

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import RecipeView from '@/app/components/RecipeView';

const RecipePage: React.FC = () => {
  const { recipeId } = useParams();
  const [isDialogOpen, setIsDialogOpen] = useState(true);

  if (!recipeId || typeof recipeId !== 'string') {
    return <div className="text-center text-gray-500">Invalid recipe ID</div>;
  }

  return (
    <>
      {isDialogOpen && (
        <RecipeView
          recipeId={recipeId}
          onClose={() => setIsDialogOpen(false)} 
        />
      )}
    </>
  );
};

export default RecipePage;
