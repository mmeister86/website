import { NextResponse } from 'next/server'

const API_KEY = process.env.RAPIDAPI_KEY
const API_HOST = 'movie-database-alternative.p.rapidapi.com'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const genre = searchParams.get('genre')

  if (!genre) {
    return NextResponse.json({ error: 'Genre is required' }, { status: 400 })
  }

  try {
    const response = await fetch(`https://${API_HOST}/?s=${genre}&r=json&page=1`, {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': API_KEY!,
        'X-RapidAPI-Host': API_HOST
      }
    })

    if (!response.ok) {
      throw new Error('API response was not ok')
    }

    const data = await response.json()

    if (data.Search && data.Search.length > 0) {
      const randomIndex = Math.floor(Math.random() * data.Search.length)
      return NextResponse.json(data.Search[randomIndex])
    } else {
      return NextResponse.json({ error: 'No movies found for this genre' }, { status: 404 })
    }
  } catch (error) {
    console.error('Error fetching movie:', error)
    return NextResponse.json({ error: 'Failed to fetch movie recommendation' }, { status: 500 })
  }
}