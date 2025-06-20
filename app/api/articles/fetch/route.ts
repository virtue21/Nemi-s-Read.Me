import { NextResponse } from "next/server"
import { newsletterSources } from "@/lib/newsletter-sources"
import { parseRSSFeed } from "@/lib/rss-parser"

export async function GET() {
  try {
    console.log("Starting to fetch articles from all sources...")

    const allArticles = []
    const fetchPromises = newsletterSources.map(async (source) => {
      try {
        if (source.apiType === "rss" && source.rssUrl) {
          const articles = await parseRSSFeed(source.rssUrl, source)
          return articles
        }
        return []
      } catch (error) {
        console.error(`Error fetching from ${source.name}:`, error)
        return []
      }
    })

    const results = await Promise.allSettled(fetchPromises)

    results.forEach((result, index) => {
      if (result.status === "fulfilled") {
        allArticles.push(...result.value)
      } else {
        console.error(`Failed to fetch from ${newsletterSources[index].name}:`, result.reason)
      }
    })

    // Sort by date (newest first)
    allArticles.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

    console.log(`Successfully fetched ${allArticles.length} articles`)

    return NextResponse.json({
      articles: allArticles,
      total: allArticles.length,
      sources: newsletterSources.length,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error("Error in fetch articles API:", error)
    return NextResponse.json(
      { error: "Failed to fetch articles", details: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 },
    )
  }
}
