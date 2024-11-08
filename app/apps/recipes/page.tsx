"use client";
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Link from 'next/link'; // Importing Link for navigation

// Types for recipe data
interface Recipe {
  id: number;
  title: string;
  readyInMinutes: number;
  servings: number;
  image: string;
  calories?: number;
  description?: string;
}

const Recipes = () => {
  // State management for input, recipes, loading state and errors
  const [ingredients, setIngredients] = useState("");
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // Function to fetch recipes through our API route
  const searchRecipes = async () => {
    if (!ingredients.trim()) return;

    setIsLoading(true);
    setError("");

    try {
      // Call local API route
      const response = await fetch(
        `/api/recipes?query=${encodeURIComponent(ingredients)}`
      );

      if (!response.ok) {
        throw new Error('Error fetching recipes');
      }

      const recipes = await response.json();

      if ('error' in recipes) {
        throw new Error(recipes.error);
      }

      setRecipes(recipes);
    } catch (err) {
      setError('Error loading recipes. Please try again later.');
      console.error('Error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section with improved styling */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        <h1 className="text-5xl font-bold mb-3 text-center">
          Delicious <span className="text-[#8B9D5A]">Stuff</span>
        </h1>
        <p className="text-gray-600 mb-12 text-center text-lg">
          Keeping up your healthy body with healthy but delicious foods
        </p>

        {/* Improved search section */}
        <div className="max-w-2xl mx-auto mb-16">
          <div className="flex gap-2">
            <Input
              type="text"
              placeholder="Enter your ingredients (e.g., potatoes, carrots)"
              value={ingredients}
              onChange={(e) => setIngredients((e.target as HTMLInputElement).value)}
              className="flex-1"
              onKeyPress={(e) => e.key === 'Enter' && searchRecipes()}
            />
            <Button 
              className="bg-[#8B9D5A] hover:bg-[#7A8B4B] px-8"
              onClick={searchRecipes}
              disabled={isLoading}
            >
              {isLoading ? 'Searching...' : 'Search'}
            </Button>
          </div>
          {error && (
            <p className="text-red-500 mt-2 text-sm">{error}</p>
          )}
        </div>

        {/* Recipe grid with improved cards */}
        {recipes.length > 0 && (
          <>
            <h2 className="text-2xl font-semibold mb-8">Found Recipes:</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {recipes.map((recipe) => (
                <Link key={recipe.id} href={`/apps/recipes/${recipe.id}`}>
                  <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                    {/* Recipe image */}
                    <div className="relative h-48 w-full">
                      <img
                        src={recipe.image}
                        alt={recipe.title}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    {/* Recipe details */}
                    <div className="p-6">
                      <h3 className="text-xl font-semibold mb-2 line-clamp-2">
                        {recipe.title}
                      </h3>
                      <div className="flex items-center gap-3 text-sm text-gray-500 mb-2">
                        <span>⏱ {recipe.readyInMinutes} min</span>
                        <span>👥 {recipe.servings} serv.</span>
                        {recipe.calories && (
                          <span>🔥 {Math.round(recipe.calories)} kcal</span>
                        )}
                      </div>
                      {recipe.description && (
                        <p className="text-sm text-gray-600 line-clamp-2">
                          {recipe.description}
                        </p>
                      )}
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </>
        )}

        {/* Initial state when no recipes have been searched */}
        {!isLoading && recipes.length === 0 && (
          <div className="text-center text-gray-500">
            <p>Enter your available ingredients and find matching recipes!</p>
          </div>
        )}

        {/* Loading state */}
        {isLoading && (
          <div className="text-center text-gray-500">
            <p>Searching for matching recipes...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Recipes;