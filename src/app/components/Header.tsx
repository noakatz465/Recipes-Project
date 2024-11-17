'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { getAllCategories } from '../services/categoryService';
import { CategoryModel } from '../models/categoryModel';

function Header() {
  const [categories, setCategories] = useState<CategoryModel[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // Dropdown visibility state

  useEffect(() => {
    const fetchCategories = async () => {
      try {
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
    setSelectedCategories((prevSelectedCategories) => {
      if (prevSelectedCategories.includes(categoryId)) {
        return prevSelectedCategories.filter((id) => id !== categoryId);
      } else {
        return [...prevSelectedCategories, categoryId];
      }
    });
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="bg-white shadow-sm px-8 py-4 flex items-center justify-between">
      <h1 className="text-2xl font-bold text-gray-800">Recipes</h1>
      <div className="flex items-center space-x-6">
        {/* Category Dropdown */}
        <div className="relative">
          <button
            onClick={toggleDropdown}
            className="bg-gray-100 text-gray-800 px-4 py-2 rounded-md border border-gray-300 text-sm font-medium hover:bg-gray-200"
          >
            Pick a Category
          </button>
          {isDropdownOpen && ( // Conditionally render the dropdown
            <div className="absolute left-0 mt-2 w-48 bg-white border border-gray-300 rounded-md shadow-lg z-10">
              <input
                type="text"
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border-b border-gray-300 text-sm focus:outline-none"
              />
              <div className="py-2 max-h-48 overflow-y-auto">
                {categories
                  .filter((category) =>
                    category.name.toLowerCase().includes(searchTerm.toLowerCase())
                  )
                  .map((category) => (
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

        {/* Search Bar */}
        <div className="flex items-center border border-gray-300 rounded-md overflow-hidden">
          <input
            type="text"
            placeholder="Search"
            className="px-4 py-2 text-sm text-gray-800 focus:outline-none"
          />
          <button className="bg-gray-100 px-4 py-2 text-gray-800 hover:bg-gray-200">
            🔍
          </button>
        </div>

        {/* Navigation Links */}
        <div className="flex space-x-4">
          <Link href="/pages/recipeList" className="text-gray-800 hover:text-purple-500 font-medium">
            All Recipes
          </Link>
          <Link href="/pages/favourites" className="text-gray-800 hover:text-purple-500 font-medium">
            Favorites
          </Link>
        </div>

        {/* Add Recipe Button */}
        <Link href={"/pages/addRecipe"} className="bg-purple-500 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-purple-600">
          Add Recipe
        </Link>
      </div>
    </div>
  );
}

export default Header;
