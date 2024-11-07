'use client'

import { useState } from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import Image from 'next/image'

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
  Synopsis?: string;  // Neue Zeile für die Synopsis
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
  <div className="flex flex-col md:flex-row gap-6 w-full max-w-[1200px]">
    {/* Linke Spalte - Suchmaske */}
    <Card className="w-full md:w-[350px]">
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
        <Button 
          className="w-full mt-4" 
          onClick={fetchMovie} 
          disabled={!selectedGenre || loading}
        >
          {loading ? 'Loading...' : 'Get Recommendation'}
        </Button>
      </CardContent>
    </Card>

    {/* Rechte Spalte - Ergebnisse */}
    <Card className="w-full md:flex-1">
      <CardHeader>
        <CardTitle>Movie Details</CardTitle>
        <CardDescription>Your movie recommendation will appear here</CardDescription>
      </CardHeader>
      <CardContent>
        {error && <p className="text-red-500">{error}</p>}
        {!movie && !error && !loading && (
          <p className="text-muted-foreground">Select a genre and click &quot;Get Recommendation&quot; to find a movie</p>
        )}
        {loading && <p>Loading...</p>}
        {movie && (
          <div className="w-full">
            <div className="flex flex-col md:flex-row gap-6">
              {/* Poster Spalte */}
              {movie.Poster && movie.Poster !== 'N/A' && (
                <div className="w-full md:w-[300px] flex-shrink-0">
                  <Image 
                    src={movie.Poster} 
                    alt={movie.Title}
                    width={300}
                    height={450}
                    className="w-full rounded-md shadow-md"
                  />
                </div>
              )}
              {/* Details Spalte */}
              <div className="flex-1">
                <h3 className="text-2xl font-bold mb-4">{movie.Title}</h3>
                <div className="space-y-2">
                  <p><span className="font-semibold">Year:</span> {movie.Year}</p>
                  <p><span className="font-semibold">Type:</span> {movie.Type}</p>
                  {movie.id && (
                    <a
                      href={`https://www.themoviedb.org/movie/${movie.id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block mt-4 text-blue-500 hover:text-blue-700 underline"
                    >
                      View on TMDB
                    </a>
                  )}
                  {movie.Synopsis && (
                    <div className="mt-4">
                      <h4 className="font-semibold mb-2">Synopsis:</h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {movie.Synopsis}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  </div>
  )
}
