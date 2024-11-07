'use client'

import { useState } from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'

// Liste der verfügbaren Film-Genres mit IDs und Namen
const genres = [
  { id: 28, name: 'Action' },
  { id: 35, name: 'Comedy' },
  { id: 18, name: 'Drama' },
  { id: 27, name: 'Horror' },
  { id: 10749, name: 'Romance' },
  { id: 878, name: 'Science Fiction' },
]

// Interface für die Struktur eines Films
interface Movie {
  Title: string;
  Year: string;
  Type: string;
  Poster: string;  // Für das Filmposter
  id?: number;     // Für den TMDB Link
}

export default function MovieRecommender() {
  // State Variablen mit TypeScript Typen
  const [selectedGenre, setSelectedGenre] = useState<string>('')
  const [movie, setMovie] = useState<Movie | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string>('')

  // Funktion zum Abrufen einer Filmempfehlung
  const fetchMovie = async () => {
    setLoading(true)
    setError('')
    setMovie(null)

    try {
      const response = await fetch(`/api/getMovie?genre=${selectedGenre}`)

      if (!response.ok) {
        throw new Error('Network response was not ok')
      }

      const data = await response.json()
      
      if (data.Title) {
        setMovie(data)
      } else {
        setError('No movies found for this genre')
      }
    } catch (error) {
      setError('Failed to fetch movie recommendation')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="w-[350px] max-w-[90vw]">
      <CardHeader>
        <CardTitle>Movie Recommender</CardTitle>
        <CardDescription>Select a genre to get a movie recommendation</CardDescription>
      </CardHeader>
      <CardContent>
        <Select onValueChange={setSelectedGenre}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select a genre" />
          </SelectTrigger>
          <SelectContent>
            {genres.map((genre) => (
              <SelectItem key={genre.id} value={genre.id.toString()}>
                {genre.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button className="w-full mt-4" onClick={fetchMovie} disabled={!selectedGenre || loading}>
          {loading ? 'Loading...' : 'Get Recommendation'}
        </Button>
      </CardContent>
      <CardFooter className="flex flex-col items-start w-full">
        {error && <p className="text-red-500">{error}</p>}
        {movie && (
          <div className="w-full">
            <h3 className="font-bold">{movie.Title}</h3>
            <p>Year: {movie.Year}</p>
            <p>Type: {movie.Type}</p>
            {movie.Poster && movie.Poster !== 'N/A' && (
              <div className="mt-4">
                <img 
                  src={movie.Poster} 
                  alt={movie.Title}
                  className="w-full rounded-md shadow-md"
                />
              </div>
            )}
            {movie.id && (
              <a
                href={`https://www.themoviedb.org/movie/${movie.id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-block text-blue-500 hover:text-blue-700 underline"
              >
                View on TMDB
              </a>
            )}
          </div>
        )}
      </CardFooter>
    </Card>
  )
}
