import { ArticleCard } from "./article-card"

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

interface ArticleGridProps {
  articles: Article[]
  loading?: boolean
}

export function ArticleGrid({ articles, loading }: ArticleGridProps) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="h-64 bg-muted animate-pulse rounded-lg" />
        ))}
      </div>
    )
  }

  if (articles.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">📰</div>
        <h3 className="text-lg font-semibold mb-2">No articles found</h3>
        <p className="text-muted-foreground">Try adjusting your filters or check back later for new content.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {articles.map((article) => (
        <ArticleCard key={article.id} article={article} />
      ))}
    </div>
  )
}
