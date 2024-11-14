'use client'

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { getAllCategories } from '../services/categoryService';
import { CategoryModel } from '../models/categoryModel';

function Header() {
  const [categories, setCategories] = useState<CategoryModel[]>([]); // השתמש בקלאס CategoryModel
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categories = await getAllCategories();
        setCategories(categories.map((category: { _id: string; name: string; }) => new CategoryModel(category._id, category.name))); // יצירת אובייקטים של CategoryModel
        console.log(categories);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
    fetchCategories();
  }, []);

  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategories((prevSelectedCategories) => {
      if (prevSelectedCategories.includes(categoryId)) {
        // אם הקטגוריה כבר נבחרה, נסיר אותה
        return prevSelectedCategories.filter((id) => id !== categoryId);
      } else {
        // אם הקטגוריה לא נבחרה, נוסיף אותה
        return [...prevSelectedCategories, categoryId];
      }
    });
  };

  return (
    <div className="bg-purple-500 h-20 flex items-center justify-between px-8 shadow-md">
      <div className="text-white text-xl font-semibold">הלוגו שלי</div>
      <div className="space-x-4">
        <Link href="/" className="text-white hover:text-purple-200 transition-colors">לינק 1</Link>
        <Link href="/page2" className="text-white hover:text-purple-200 transition-colors">לינק 2</Link>

        {/* Dropdown */}
        <div className="relative inline-block text-left">
          <div>
            <button
              type="button"
              className="inline-flex justify-center w-full rounded-md border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
              id="menu-button"
              aria-expanded="true"
              aria-haspopup="true"
            >
              קטגוריות
            </button>
          </div>

          {/* Dropdown Menu */}
          <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="py-1">
              {categories.map((category) => (
                <div key={category._id} className="flex items-center px-4 py-2 text-sm text-gray-700">
                  <input
                    type="checkbox"
                    id={`category-${category._id}`}
                    checked={selectedCategories.includes(category._id)}
                    onChange={() => handleCategoryChange(category._id)}
                    className="mr-2"
                  />
                  <label htmlFor={`category-${category._id}`} className="block text-sm">
                    {category.name}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
