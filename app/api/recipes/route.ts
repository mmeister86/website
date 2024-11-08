import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    // URL-Parameter aus der Anfrage extrahieren
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('query');

    if (!query) {
      return NextResponse.json(
        { error: 'Keine Suchbegriffe angegeben' },
        { status: 400 }
      );
    }

    // Spoonacular API aufrufen
    const response = await fetch(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.NEXT_PUBLIC_SPOONACULAR_API_KEY}&query=${encodeURIComponent(query)}&addRecipeInformation=true&number=6&instructionsRequired=true&fillIngredients=true`
    );

    if (!response.ok) {
      throw new Error('Fehler bei der Spoonacular API');
    }

    const data = await response.json();

    // Daten transformieren
    const recipes = data.results.map((recipe: any) => ({
      id: recipe.id,
      title: recipe.title,
      readyInMinutes: recipe.readyInMinutes,
      servings: recipe.servings,
      image: recipe.image,
      calories: recipe.nutrition?.nutrients.find((n: any) => n.name === "Calories")?.amount,
      description: recipe.summary
        ? recipe.summary
            .replace(/<[^>]*>/g, '')
            .split('. ')[0]
        : undefined
    }));

    return NextResponse.json(recipes);
  } catch (error) {
    console.error('API Fehler:', error);
    return NextResponse.json(
      { error: 'Fehler beim Abrufen der Rezepte' },
      { status: 500 }
    );
  }
}
