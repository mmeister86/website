import { NextResponse } from 'next/server'

const API_KEY = process.env.TMDB_API_KEY

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const genre = searchParams.get('genre')
  const page = searchParams.get('page') || '1' // Hole die Seite aus den Parametern

  if (!genre) {
    return NextResponse.json({ error: 'Genre is required' }, { status: 400 })
  }

  try {
    const today = new Date().toISOString().split('T')[0];
    const response = await fetch(
      `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=${genre}&language=en-US&primary_release_date.lte=${today}&primary_release_date.gte=1970-01-01&sort_by=random.random&vote_count.gte=100&page=${page}`,
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
        id: movie.id,
        Synopsis: movie.overview
      })
    } else {
      return NextResponse.json({ error: 'No movies found for this genre' }, { status: 404 })
    }
  } catch (error) {
    console.error('Error fetching movie:', error)
    return NextResponse.json({ error: 'Failed to fetch movie recommendation' }, { status: 500 })
  }
}
