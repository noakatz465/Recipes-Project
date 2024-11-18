import { create } from 'zustand';
import RecipeModel from '../models/recipeModel';
import { CategoryModel } from '../models/categoryModel';
import { getAllCategories } from '../services/categoryService';
import { getAllRecipes, updateRecipe } from '../services/recipesService';

interface RecipeStore {
  recipes: RecipeModel[]; // רשימת כל המתכונים
  filteredRecipes: RecipeModel[]; // מתכונים מסוננים
  categories: CategoryModel[]; // קטגוריות מתכונים
  selectedCategories: string[]; // קטגוריות שנבחרו לסינון
  favoriteRecipes: RecipeModel[]; // מתכונים מועדפים
  loading: boolean; // מצב טעינה
  error: string | null; // הודעת שגיאה (אם יש)
  searchTerm: string; // מונח חיפוש (חיפוש לפי שם מתכון)
  fetchData: () => Promise<void>; // פונקציה לשליפת נתונים
  toggleFavorite: (recipe: RecipeModel) => Promise<void>; // פונקציה לעדכון מתכון מועדף
  toggleCategoryFilter: (categoryId: string) => void; // פונקציה לסינון לפי קטגוריות
  filterRecipesBySearch: (searchTerm: string) => void; // פונקציה לסינון לפי מונח חיפוש
  resetFilters: () => void; // פונקציה לאיפוס סינונים
}

const useRecipeStore = create<RecipeStore>((set, get) => ({
  recipes: [],
  filteredRecipes: [],
  categories: [],
  selectedCategories: [],
  favoriteRecipes: [],
  loading: true,
  error: null,
  searchTerm: '',

  fetchData: async () => {
    try {
      set({ loading: true, error: null });

      const fetchedCategories = await getAllCategories();
      const categoryObjects = fetchedCategories.map(
        (category: CategoryModel) => new CategoryModel(category._id, category.name)
      );

      const fetchedRecipes = await getAllRecipes();
      const recipeObjects = fetchedRecipes.map((data: RecipeModel) => {
        const category = categoryObjects.find((cat: { _id: string }) => cat._id === data.categoryId);
        return new RecipeModel({
          ...data,
          categoryName: category ? category.name : 'Unknown',
        });
      });

      set({
        recipes: recipeObjects,
        filteredRecipes: recipeObjects,
        categories: categoryObjects,
        favoriteRecipes: recipeObjects.filter((r: RecipeModel) => r.isFavorite),
        loading: false,
      });
    } catch (error) {
      console.error(error);
      set({ error: 'שגיאה בטעינת הנתונים', loading: false });
    }
  },

  toggleFavorite: async (recipe: RecipeModel) => {
    const { recipes, selectedCategories, searchTerm } = get();
    try {
      const updatedRecipe = {
        ...recipe,
        isFavorite: !recipe.isFavorite,
      };

      await updateRecipe(updatedRecipe);

      const updatedRecipes = recipes.map((r) =>
        r._id === recipe._id ? updatedRecipe : r
      );

      // סינון מחדש של כל הרשימות
      const filteredRecipes = updatedRecipes.filter(
        (r) =>
          (selectedCategories.length === 0 || selectedCategories.includes(r.categoryId)) &&
          r.mealName.toLowerCase().includes(searchTerm.toLowerCase())
      );

      set({
        recipes: updatedRecipes,
        filteredRecipes,
        favoriteRecipes: filteredRecipes.filter((r) => r.isFavorite),
      });
    } catch (error) {
      console.error('שגיאה בעדכון סטטוס מועדף:', error);
      set({ error: 'שגיאה בעדכון סטטוס מועדף' });
    }
  },

  toggleCategoryFilter: (categoryId: string) => {
    const { selectedCategories, recipes, searchTerm } = get();

    const updatedCategories = selectedCategories.includes(categoryId)
      ? selectedCategories.filter((id) => id !== categoryId)
      : [...selectedCategories, categoryId];

    const filteredRecipes = recipes.filter(
      (recipe) =>
        (updatedCategories.length === 0 || updatedCategories.includes(recipe.categoryId)) &&
        recipe.mealName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    set({
      selectedCategories: updatedCategories,
      filteredRecipes,
      favoriteRecipes: filteredRecipes.filter((r) => r.isFavorite),
    });
  },

  filterRecipesBySearch: (searchTerm: string) => {
    const { recipes, selectedCategories } = get();

    const filteredRecipes = recipes.filter(
      (recipe) =>
        recipe.mealName.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (selectedCategories.length === 0 || selectedCategories.includes(recipe.categoryId))
    );

    set({
      searchTerm,
      filteredRecipes,
      favoriteRecipes: filteredRecipes.filter((r) => r.isFavorite),
    });

  },
  resetFilters(){
      
  }
}));

export default useRecipeStore;


