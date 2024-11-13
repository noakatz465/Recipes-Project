import connect from '@/app/lib/db/mongoDB';
import Category from '@/app/lib/models/CategorySchema';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  try {
    await connect();

    const categories = await Category.find();

    return NextResponse.json({
      message: 'Categories fetched successfully',
      categories: categories.map(category => ({
        _id: category._id,
        name: category.name,
      })),
    });
  } catch (error) {
    return NextResponse.json({ message: 'Error fetching categories', error: error });
  }
}
