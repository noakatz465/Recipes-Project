import connect from '@/app/lib/db/mongoDB';
import Category from '@/app/lib/models/CategorySchema';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    await connect();  

    const { name } = await req.json();  

    const newCategory = new Category({
      name,
    });

    await newCategory.save();

    return NextResponse.json({
      message: 'Category added successfully',
      category: {
        _id: newCategory._id,
        name: newCategory.name,
      },
    });
  } catch (error) {
    return NextResponse.json({ message: 'Error adding category', error: error });
  }
}
