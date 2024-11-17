import { create } from 'zustand';
import RecipeModel from '../models/recipeModel';
import { CategoryModel } from '../models/categoryModel';
import { getAllCategories } from '../services/categoryService';
import { getAllRecipes, updateRecipe } from '../services/recipesService';
interface RecipeStore {
  recipes: RecipeModel[];
  filteredRecipes: RecipeModel[]; // מתכונים מסוננים
  categories: CategoryModel[];
  selectedCategories: string[]; // קטגוריות נבחרות
  favoriteRecipes: RecipeModel[];
  loading: boolean;
  error: string | null;
  searchTerm: string; // Add searchTerm property
  fetchData: () => Promise<void>;
  toggleFavorite: (recipe: RecipeModel) => Promise<void>;
  toggleCategoryFilter: (categoryId: string) => void; // סינון לפי קטגוריות
  filterRecipesBySearch: (searchTerm: string) => void; // סינון לפי חיפוש
}

const useRecipeStore = create<RecipeStore>((set, get) => ({
  recipes: [],
  filteredRecipes: [],
  categories: [],
  selectedCategories: [],
  favoriteRecipes: [],
  loading: true,
  error: null,
  searchTerm: '', // Initialize searchTerm with an empty string

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

      set({
        recipes: recipeObjects,
        filteredRecipes: recipeObjects, // Initially show all recipes
        categories: categoryObjects,
        favoriteRecipes,
        loading: false,
      });
    } catch (error) {
      console.error(error);
      set({ error: 'Failed to fetch data', loading: false });
    }
  },

  toggleFavorite: async (recipe: RecipeModel) => {
    const { recipes } = get();
    try {
      const updatedRecipe = {
        ...recipe,
        isFavorite: !recipe.isFavorite,
      };

      // Update on the server
      await updateRecipe(updatedRecipe);

      // Update in the store
      const updatedRecipes = recipes.map((r) =>
        r._id === recipe._id ? updatedRecipe : r
      );
      const updatedFavorites = updatedRecipes.filter((r) => r.isFavorite);

      set({
        recipes: updatedRecipes,
        filteredRecipes: updatedRecipes.filter((recipe) =>
          get().selectedCategories.length > 0
            ? get().selectedCategories.includes(recipe.categoryId)
            : true
        ), // Update filtering based on selected categories
        favoriteRecipes: updatedFavorites,
      });
    } catch (error) {
      console.error('Error toggling favorite status:', error);
      set({ error: 'Failed to update favorite status' });
    }
  },

  toggleCategoryFilter: (categoryId: string) => {
    const { selectedCategories, recipes, searchTerm } = get();

    // Update selected categories
    const updatedCategories = selectedCategories.includes(categoryId)
      ? selectedCategories.filter((id) => id !== categoryId)
      : [...selectedCategories, categoryId];

    // Update filtered recipes based on search term and selected categories
    const filtered = recipes.filter(
      (recipe) =>
        (updatedCategories.length === 0 || updatedCategories.includes(recipe.categoryId)) &&
        recipe.mealName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    set({ selectedCategories: updatedCategories, filteredRecipes: filtered });
  },

  filterRecipesBySearch: (searchTerm: string) => {
    const { recipes, selectedCategories } = get();

    // Update filtered recipes based on search term and selected categories
    const filtered = recipes.filter(
      (recipe) =>
        recipe.mealName.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (selectedCategories.length === 0 || selectedCategories.includes(recipe.categoryId))
    );

    set({ searchTerm, filteredRecipes: filtered });
  },
}));

export default useRecipeStore;
