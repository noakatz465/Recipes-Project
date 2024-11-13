import mongoose from 'mongoose';

export interface IRecipe {
  _id: mongoose.Types.ObjectId;
  categoryId: mongoose.Types.ObjectId;
  description: string;
  mealName: string;
  img: string;
  instructions: string;
}
