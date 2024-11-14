import mongoose from 'mongoose';

export interface IRecipe {
  _id: mongoose.Types.ObjectId;
  categoryId: mongoose.Types.ObjectId;
  description: string;
  mealName: string;
  img: string;
  instructions: string;
  isFavorite: boolean; // שדה חדש - האם מועדף
  ingredients: string[]; // שדה חדש - רשימת מרכיבים
}
