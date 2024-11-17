import axios from 'axios';
import RecipeModel from '../models/recipeModel';
const API_URL = 'http://localhost:3000/api/recipes';

// פונקציה לקבלת כל המתכונים
export const getAllRecipes = async () => {
  try {
    const response = await axios.get(`${API_URL}/get`);
    return response.data.recipes;
  } catch (error) {
    console.error('Error fetching recipes:', error);
    throw error;
  }
};

// פונקציה לקבלת מתכונים לפי קטגוריה
export const getRecipesByCategory = async (categoryId: string) => {
  try {
    const response = await axios.get(`${API_URL}/get/categoryId/${categoryId}`);
    return response.data.recipes;
  } catch (error) {
    console.error('Error fetching recipes by category:', error);
    throw error;
  }
};

//פונקציה לקבלת כל המתכונים המועדפים
export const getFavoriteRecipes = async () => {
  try {
    const response = await axios.get(`${API_URL}/get/getAllFavourites`);
    return response.data.recipes;
  } catch (error) {
    console.error('Error fetching favorite recipes:', error);
  }
}
// פונקציה לקבלת מתכון לפי ID
export const getRecipeById = async (recipeId: string) => {
  try {
    const response = await axios.get(`${API_URL}/get/recipeId/${recipeId}`);
    console.log(response.data.recipe)
    return response.data.recipe; // Return the single recipe object
  } catch (error) {
    console.error('Error fetching recipe by ID:', error);
    throw error;
  }
};

// פונקציה להוספת מתכון חדש
export const addRecipe = async (recipe: RecipeModel) => {
  try {
    const response = await axios.post(`${API_URL}/post`, recipe);
    return response.data;
  } catch (error) {
    console.error('Error adding recipe:', error);
    throw error;
  }
};


// פונקציה לעדכון מתכון קיים
export const updateRecipe = async (recipe: RecipeModel) => {
  try {
    console.log(recipe)

    const response = await axios.put(`${API_URL}/put/${recipe._id}`, recipe);
    return response.data.updatedRecipe;
  } catch (error) {
    console.error('Error updating recipe:', error);
    throw error;
  }
};

