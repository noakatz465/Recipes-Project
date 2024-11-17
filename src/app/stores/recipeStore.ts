import { create } from 'zustand';
import RecipeModel from '../models/recipeModel';
import { CategoryModel } from '../models/categoryModel';
import { getAllCategories } from '../services/categoryService';
import { getAllRecipes, updateRecipe } from '../services/recipesService';

interface RecipeStore {
  recipes: RecipeModel[];
  categories: CategoryModel[];
  favoriteRecipes: RecipeModel[];
  loading: boolean;
  error: string | null;
  fetchData: () => Promise<void>;
  toggleFavorite: (recipe: RecipeModel) => Promise<void>; // פונקציה לעדכון מועדף
}

const useRecipeStore = create<RecipeStore>((set, get) => ({
  recipes: [],
  categories: [],
  favoriteRecipes: [],
  loading: true,
  error: null,

  fetchData: async () => {
    try {
      set({ loading: true, error: null });

      // Fetch categories
      const fetchedCategories = await getAllCategories();
      const categoryObjects = fetchedCategories.map(
        (category: any) => new CategoryModel(category._id, category.name)
      );

      // Fetch recipes and map to RecipeModel with categoryName
      const fetchedRecipes = await getAllRecipes();
      const recipeObjects = fetchedRecipes.map((data: any) => {
        const category = categoryObjects.find((cat: { _id: any }) => cat._id === data.categoryId);
        return new RecipeModel({
          ...data,
          categoryName: category ? category.name : 'Unknown',
        });
      });

      const favoriteRecipes = recipeObjects.filter((recipe: { isFavorite: any }) => recipe.isFavorite);

      set({ recipes: recipeObjects, categories: categoryObjects, favoriteRecipes: favoriteRecipes, loading: false });
    } catch (error) {
      console.error(error);
      set({ error: 'Failed to fetch data', loading: false });
    }
  },

  // פונקציה לעדכון מצב מועדף על ידי שליחת אובייקט המתכון
  toggleFavorite: async (recipe: RecipeModel) => {
    const { recipes } = get(); // קבל את המתכונים הנוכחיים
    try {
      // הפוך את המצב של isFavorite
      const updatedRecipe = {
        ...recipe,
        isFavorite: !recipe.isFavorite,
      };

      // עדכן בשרת
      await updateRecipe(updatedRecipe);

      // עדכן בחנות
      const updatedRecipes = recipes.map((r) =>
        r._id === recipe._id ? updatedRecipe : r
      );
      const updatedFavorites = updatedRecipes.filter((r) => r.isFavorite);

      set({ recipes: updatedRecipes, favoriteRecipes: updatedFavorites });
    } catch (error) {
      console.error('Error toggling favorite status:', error);
      set({ error: 'Failed to update favorite status' });
    }
  },
}));

export default useRecipeStore;
