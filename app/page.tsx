"use client"

import { useState, useMemo, useEffect } from "react"
import dynamic from "next/dynamic"
import { Header } from "@/components/header"
import { ArticleGrid } from "@/components/article-grid"

const ClientToaster = dynamic(() => import("@/components/ui/toaster").then(mod => mod.Toaster), {
  ssr: false,
})
  ssr: false,
})

interface Article {
  id: string
  title: string
  source: string
  category: string
  geo: string
  frequency: string
  date: string
  link?: string
  summary?: string
  tags: string[]
}

export default function Home() {
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)
  const [activeCategory, setActiveCategory] = useState("all")
  const [geoFilter, setGeoFilter] = useState("all")
  const [frequencyFilter, setFrequencyFilter] = useState("all")

  useEffect(() => {
    fetchArticles()
  }, [])

  const fetchArticles = async () => {
    try {
      setLoading(true)
      const response = await fetch("/api/articles/fetch")
      const data = await response.json()
      setArticles(data.articles || [])
    } catch (error) {
      console.error("Failed to fetch articles:", error)
    } finally {
      setLoading(false)
    }
  }

  const filteredArticles = useMemo(() => {
    return articles.filter((article) => {
      const categoryMatch = activeCategory === "all" || article.category === activeCategory
      const geoMatch = geoFilter === "all" || article.geo === geoFilter
      const frequencyMatch = frequencyFilter === "all" || article.frequency === frequencyFilter

      return categoryMatch && geoMatch && frequencyMatch
    })
  }, [articles, activeCategory, geoFilter, frequencyFilter])

  return (
    <div className="min-h-screen bg-background">
      <Header
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
        geoFilter={geoFilter}
        onGeoFilterChange={setGeoFilter}
        frequencyFilter={frequencyFilter}
        onFrequencyFilterChange={setFrequencyFilter}
      />

      <main className="container py-8">
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold mb-2">Your Personalized Newsletter Feed</h2>
              <p className="text-muted-foreground">
                Stay updated with the latest in product management, tech, stablecoins, and business.
              </p>
            </div>
            <button
              onClick={fetchArticles}
              className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              Refresh Feed
            </button>
          </div>
        </div>

        <ArticleGrid articles={filteredArticles} loading={loading} />
      </main>

      <ClientToaster />
    </div>
  )
}
