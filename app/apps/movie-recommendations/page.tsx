import MovieRecommender from '@/components/MovieRecommender'

export default function Home() {
  return (
    <main className="w-full min-h-screen">
      <div className="max-w-6xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-8 text-center">Movie Recommender</h1>
        <MovieRecommender />
      </div>
    </main>
  )
}
