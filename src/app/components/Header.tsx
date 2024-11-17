'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { getAllCategories } from '../services/categoryService';
import { CategoryModel } from '../models/categoryModel';
import useRecipeStore from '../stores/recipeStore'; // Import the store

function Header() {
  const [categories, setCategories] = useState<CategoryModel[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Get the store actions and state
  const { selectedCategories, toggleCategoryFilter, filterRecipesBySearch } = useRecipeStore();

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
    toggleCategoryFilter(categoryId); // Call the toggleCategoryFilter from the store
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setSearchTerm(term); // Update local search state
    filterRecipesBySearch(term); // Update filtered recipes in the store
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
          {isDropdownOpen && (
            <div className="absolute left-0 mt-2 w-48 bg-white border border-gray-300 rounded-md shadow-lg z-10">
              
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
            value={searchTerm} // Controlled input
            onChange={handleSearchChange} // Call search handler on change
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
            Favourites
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
