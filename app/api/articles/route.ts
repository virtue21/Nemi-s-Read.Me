import { type NextRequest, NextResponse } from "next/server"

// This would typically connect to your database or external APIs
const mockArticles = [
  {
    id: "1",
    title: "The Future of Product Management in African Startups",
    source: "TechCabal",
    category: "product",
    geo: "africa",
    frequency: "weekly",
    date: "2024-01-15",
    link: "https://example.com/article1",
    summary: "Exploring how product management practices are evolving in the African startup ecosystem.",
    tags: ["PM", "Africa", "Startup"],
  },
  // Add more articles here...
]

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const category = searchParams.get("category")
  const geo = searchParams.get("geo")
  const frequency = searchParams.get("frequency")

  let filteredArticles = mockArticles

  if (category && category !== "all") {
    filteredArticles = filteredArticles.filter((article) => article.category === category)
  }

  if (geo && geo !== "all") {
    filteredArticles = filteredArticles.filter((article) => article.geo === geo)
  }

  if (frequency && frequency !== "all") {
    filteredArticles = filteredArticles.filter((article) => article.frequency === frequency)
  }

  return NextResponse.json({
    articles: filteredArticles,
    total: filteredArticles.length,
  })
}
