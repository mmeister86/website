import React from 'react';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface RecipeDetails {
  id: number;
  title: string;
  image: string;
  summary: string;
  servings: number;
  readyInMinutes: number;
  extendedIngredients: Array<{
    id: number;
    original: string;
  }>;
  analyzedInstructions: Array<{
    steps: Array<{
      number: number;
      step: string;
    }>;
  }>;
  nutrition?: {
    nutrients: Array<{
      name: string;
      amount: number;
    }>;
  };
}

// Function to load recipe metadata
export async function generateMetadata({ params }: { params: { id: string } }) {
  try {
    const id = params.id;
    const res = await fetch(`/api/recipes/${id}`);
    const recipe: RecipeDetails = await res.json();

    if (!recipe) {
      return notFound();
    }

    return {
      title: recipe.title,
      description: recipe.summary.replace(/<[^>]*>/g, '').substring(0, 160)
    };
  } catch (error) {
    return {
      title: 'Recipe not found',
      description: 'The requested recipe could not be loaded.'
    };
  }
}

// Function to load recipe data
async function getRecipe(id: string): Promise<RecipeDetails> {
  const res = await fetch(`/api/recipes/${id}`);
  
  if (!res.ok) {
    throw new Error('Error fetching the recipe');
  }
  
  return res.json();
}

export default async function RecipePage({ params }: { params: { id: string } }) {
  try {
    const recipe = await getRecipe(params.id);

    return (
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Card className="w-full">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl md:text-4xl font-bold text-gray-800">
              {recipe.title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative w-full h-64 md:h-96 rounded-lg overflow-hidden shadow-lg mb-6">
              <Image 
                src={recipe.image} 
                alt={recipe.title} 
                fill 
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover" 
                priority 
              />
            </div>

            <div 
              className="prose prose-lg text-gray-700 mb-8" 
              dangerouslySetInnerHTML={{ __html: recipe.summary }} 
            />

            <div className="grid md:grid-cols-3 gap-4 mb-8 text-center">
              <div className="bg-gray-100 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-600">Servings</h3>
                <p className="text-xl font-bold">{recipe.servings}</p>
              </div>
              <div className="bg-gray-100 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-600">Preparation Time</h3>
                <p className="text-xl font-bold">{recipe.readyInMinutes} minutes</p>
              </div>
              <div className="bg-gray-100 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-600">Calories</h3>
                <p className="text-xl font-bold">
                  {recipe.nutrition?.nutrients.find(n => n.name === "Calories")?.amount ?? 'N/A'} kcal
                </p>
              </div>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Ingredients</h2>
              <ul className="space-y-2 pl-5 list-disc">
                {recipe.extendedIngredients.map((ingredient) => (
                  <li key={ingredient.id} className="text-gray-700">
                    {ingredient.original}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Preparation</h2>
              <ol className="space-y-4 pl-5 list-decimal">
                {recipe.analyzedInstructions[0]?.steps.map((step) => (
                  <li key={step.number} className="text-gray-700">
                    {step.step}
                  </li>
                ))}
              </ol>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  } catch (error) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-4xl text-center">
        <Card>
          <CardContent className="p-8">
            <h1 className="text-3xl font-bold text-red-600 mb-4">Recipe not found</h1>
            <p className="text-gray-700">Sorry, but the requested recipe could not be loaded.</p>
          </CardContent>
        </Card>
      </div>
    );
  }
} 
