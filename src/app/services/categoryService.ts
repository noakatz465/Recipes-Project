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

  