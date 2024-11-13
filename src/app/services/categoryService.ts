import axios from 'axios';
const API_URL = 'http://localhost:3000/api/categories';

export const getAllCategories = async () => {
  try {
    const response = await axios.get(`${API_URL}/get`);
    return response.data.categories; 
  } catch (error) {
    console.error('Error fetching categories:', error);
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