import mongoose from 'mongoose';

export interface ICategory {
    _id: mongoose.Types.ObjectId; 
    name: string;      
  }
  