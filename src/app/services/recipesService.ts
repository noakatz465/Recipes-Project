import axios from 'axios';
const API_URL = 'http://localhost:3000/api/recipes';

export const getAllRecipes = async () => {
  try {
    const response = await axios.get(`${API_URL}/get`);
    return response.data.recipes;
  } catch (error) {
    console.error('Error fetching recipes:', error);
    throw error;
  }
};

export const getRecipesByCategory = async (categoryId: string) => {
  try {
    const response = await axios.get(`${API_URL}/get-by-category/${categoryId}`);
    return response.data.recipes;
  } catch (error) {
    console.error('Error fetching recipes by category:', error);
    throw error;
  }
};

export const addRecipe = async (newRecipeData: {
    categoryId: string;
    description: string;
    mealName: string;
    img: string;
    instructions: string;
  }) => {
    try {
      const response = await axios.post(`${API_URL}/post`, newRecipeData); 
      return response.data; 
    } catch (error) {
      console.error('Error adding recipe:', error);
      throw error; 
    }
};

export const updateRecipe = async (recipeId: string, updatedData: { description: string; mealName: string; img: string; instructions: string }) => {
  try {
    const response = await axios.put(`${API_URL}/update/${recipeId}`, updatedData);
    return response.data.updatedRecipe;
  } catch (error) {
    console.error('Error updating recipe:', error);
    throw error;
  }
};
