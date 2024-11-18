'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { getAllCategories } from '../services/categoryService';
import { CategoryModel } from '../models/categoryModel';
import useRecipeStore from '../stores/recipeStore'; // Import the store

function Header() {
  const [categories, setCategories] = useState<CategoryModel[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null); // רפרנס לתפריט הנפתח

  // שליפת פעולות ומצב מהחנות
  const { selectedCategories, toggleCategoryFilter, filterRecipesBySearch } = useRecipeStore();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        // שליפת קטגוריות מהשרת
        const categories = await getAllCategories();
        setCategories(
          categories.map((category: { _id: string; name: string }) =>
            new CategoryModel(category._id, category.name)
          )
        );
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
    fetchCategories();
  }, []);

  const handleCategoryChange = (categoryId: string) => {
    toggleCategoryFilter(categoryId); // קריאה לפונקציה לסינון לפי קטגוריות מהחנות
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setSearchTerm(term); 
    filterRecipesBySearch(term); 
  };

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev); // שינוי מצב פתיחה/סגירה של התפריט
  };

  // סגירת תפריט בעת לחיצה מחוץ לתפריט
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false); // סגירת התפריט
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="bg-white shadow-sm px-8 py-4 flex items-center justify-between">
      <h1 className="text-2xl font-bold text-gray-800">Recipes</h1>
      <div className="flex items-center space-x-6">
        {/* תפריט קטגוריות */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={toggleDropdown}
            className="bg-gray-100 text-gray-800 px-4 py-2 rounded-md border border-gray-300 text-sm font-medium hover:bg-gray-200"
          >
            Pick a Category
          </button>
          {isDropdownOpen && (
            <div className="absolute left-0 mt-2 w-48 bg-white border border-gray-300 rounded-md shadow-lg z-10">
              <div className="py-2 max-h-48 overflow-y-auto">
                {categories.map((category) => (
                  <div
                    key={category._id}
                    className="flex items-center px-4 py-1 hover:bg-gray-100 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      id={`category-${category._id}`}
                      checked={selectedCategories.includes(category._id)}
                      onChange={() => handleCategoryChange(category._id)} 
                      className="mr-2"
                    />
                    <label
                      htmlFor={`category-${category._id}`}
                      className="text-sm text-gray-700"
                    >
                      {category.name}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* שורת חיפוש */}
        <div className="flex items-center border border-gray-300 rounded-md overflow-hidden">
          <input
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={handleSearchChange} // קריאה לפונקציה לחיפוש בעת שינוי
            className="px-4 py-2 text-sm text-gray-800 focus:outline-none"
          />
        </div>

        {/* קישורי ניווט */}
        <div className="flex space-x-4">
          <Link href="/pages/recipeList" className="text-gray-800 hover:text-purple-500 font-medium">
            All Recipes
          </Link>
          <Link href="/pages/favourites" className="text-gray-800 hover:text-purple-500 font-medium">
            Favourites
          </Link>
        </div>

        {/* כפתור הוספת מתכון */}
        <Link href={"/pages/addRecipe"} className="bg-purple-500 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-purple-600">
          Add Recipe
        </Link>
      </div>
    </div>
  );
}

export default Header;
