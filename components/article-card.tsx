import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink, Calendar, MapPin, Clock } from "lucide-react"

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

interface ArticleCardProps {
  article: Article
}

export function ArticleCard({ article }: ArticleCardProps) {
  const getGeoIcon = (geo: string) => {
    switch (geo) {
      case "nigeria":
        return "🇳🇬"
      case "africa":
        return "🌍"
      case "global":
        return "🌐"
      default:
        return "📍"
    }
  }

  const getFrequencyIcon = (frequency: string) => {
    return frequency === "daily" ? "🔄" : "📆"
  }

  return (
    <Card className="h-full hover:shadow-lg transition-shadow duration-200 border-l-4 border-l-purple-500">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="text-lg leading-tight line-clamp-2">{article.title}</CardTitle>
          {article.link && (
            <Button variant="ghost" size="sm" asChild>
              <a href={article.link} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-4 w-4" />
              </a>
            </Button>
          )}
        </div>
        <CardDescription className="flex items-center gap-2 text-sm">
          <span className="font-medium">{article.source}</span>
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-0">
        {article.summary && <p className="text-sm text-muted-foreground mb-4 line-clamp-3">{article.summary}</p>}

        <div className="flex flex-wrap gap-2 mb-3">
          <Badge variant="secondary" className="bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200">
            {article.category}
          </Badge>
          {article.tags.map((tag) => (
            <Badge key={tag} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>

        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              <MapPin className="h-3 w-3" />
              <span>
                {getGeoIcon(article.geo)} {article.geo}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              <span>
                {getFrequencyIcon(article.frequency)} {article.frequency}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            <span>{article.date}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
