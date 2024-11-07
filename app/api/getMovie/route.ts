import { NextResponse } from 'next/server'

const API_KEY = process.env.TMDB_API_KEY

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const genre = searchParams.get('genre')

  if (!genre) {
    return NextResponse.json({ error: 'Genre is required' }, { status: 400 })
  }

  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=${genre}&language=de-DE`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      }
    )

    if (!response.ok) {
      throw new Error('API response was not ok')
    }

    const data = await response.json()

    if (data.results && data.results.length > 0) {
      const randomIndex = Math.floor(Math.random() * data.results.length)
      const movie = data.results[randomIndex]
      
      return NextResponse.json({
        Title: movie.title,
        Year: new Date(movie.release_date).getFullYear().toString(),
        Type: 'movie',
        Poster: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
        id: movie.id  // Füge die Movie-ID hinzu
      })
    } else {
      return NextResponse.json({ error: 'No movies found for this genre' }, { status: 404 })
    }
  } catch (error) {
    console.error('Error fetching movie:', error)
    return NextResponse.json({ error: 'Failed to fetch movie recommendation' }, { status: 500 })
  }
}
