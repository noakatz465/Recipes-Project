import { IRecipe } from '@/app/types/recipeType';
import mongoose, { Schema, Model } from 'mongoose';

const RecipeSchema: Schema<IRecipe> = new Schema({
  categoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
  description: { type: String, required: true },
  mealName: { type: String, required: true },
  img: { type: String, required: true },
  instructions: { type: String, required: true }
}, { timestamps: true });

const Recipe: Model<IRecipe> = mongoose.models.Recipe || mongoose.model<IRecipe>('Recipe', RecipeSchema);

export default Recipe;
