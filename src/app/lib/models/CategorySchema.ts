import mongoose, { Schema, Model } from 'mongoose';
import { ICategory } from '@/app/types/categoryType'; // Import of the category interface

const CategorySchema: Schema<ICategory> = new Schema({
  name: { type: String, required: true }  
});

const Category: Model<ICategory> = mongoose.models.Category || mongoose.model<ICategory>('Category', CategorySchema);

export default Category;
