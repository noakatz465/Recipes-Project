import mongoose, { Schema, Model } from 'mongoose';
import { IRecipe } from '@/app/types/recipeType';

const RecipeSchema: Schema<IRecipe> = new Schema({
  categoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
  description: { type: String, required: true },
  mealName: { type: String, required: true },
  img: { type: String, required: true },
  instructions: { type: String, required: true },
  isFavorite: { type: Boolean, default: false }, // שדה חדש - האם מועדף
  ingredients: { type: [String], required: true }, // שדה חדש - רשימת מרכיבים
}, { timestamps: true }); 

const Recipe: Model<IRecipe> = mongoose.models.Recipe || mongoose.model<IRecipe>('Recipe', RecipeSchema);

export default Recipe;
