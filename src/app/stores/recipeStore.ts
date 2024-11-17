import { create } from 'zustand';
import RecipeModel from '../models/recipeModel';
import { CategoryModel } from '../models/categoryModel';
import { getAllCategories } from '../services/categoryService';
import { getAllRecipes } from '../services/recipesService';

interface RecipeStore {
  recipes: RecipeModel[];
  categories: CategoryModel[];
  favoriteRecipes: RecipeModel[];
  loading: boolean;
  error: string | null;
  fetchData: () => Promise<void>;
}

const useRecipeStore = create<RecipeStore>((set) => ({
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
        const category = categoryObjects.find((cat) => cat._id === data.categoryId);
        return new RecipeModel({
          ...data,
          categoryName: category ? category.name : 'Unknown',
        });
      });

      const favoriteRecipes = recipeObjects.filter((recipe) => recipe.isFavorite);


      set({ recipes: recipeObjects, categories: categoryObjects, favoriteRecipes: favoriteRecipes, loading: false });
    } catch (error) {
      console.error(error);
      set({ error: 'Failed to fetch data', loading: false });
    }
  },
}));

export default useRecipeStore;
