interface RSSItem {
  title: string
  link: string
  description: string
  pubDate: string
  source: string
  category: string
  geo: string
  frequency: string
}

interface ParsedArticle {
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

export async function parseRSSFeed(rssUrl: string, source: any): Promise<ParsedArticle[]> {
  try {
    // ------------------------------------------------------------------
    // Build rss2json request – pull key from the environment if present
    // ------------------------------------------------------------------
    const apiKey = process.env.RSS2JSON_API_KEY // ←  add this in your Vercel project / .dev file
    const base = "https://api.rss2json.com/v1/api.json"
    const params = new URLSearchParams({
      rss_url: rssUrl,
      count: "10",
    })
    if (apiKey) params.set("api_key", apiKey)

    const proxyUrl = `${base}?${params.toString()}`

    const response = await fetch(proxyUrl)
    const data = await response.json()

    if (data.status !== "ok") {
      console.error(`Failed to fetch RSS for ${source.name}:`, data.message)
      return []
    }

    return data.items.map((item: any, index: number) => ({
      id: `${source.name}-${index}-${Date.now()}`,
      title: item.title || "Untitled",
      source: source.name,
      category: source.category,
      geo: source.geo,
      frequency: source.frequency,
      date: formatDate(item.pubDate),
      link: item.link,
      summary: stripHtml(item.description || item.content || "").substring(0, 200) + "...",
      tags: generateTags(item.title, item.description, source.category),
    }))
  } catch (error) {
    console.error(`Error parsing RSS feed for ${source.name}:`, error)
    return []
  }
}

function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, "").trim()
}

function formatDate(dateString: string): string {
  try {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  } catch {
    return new Date().toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }
}

function generateTags(title: string, description: string, category: string): string[] {
  const text = `${title} ${description}`.toLowerCase()
  const tags: string[] = []

  // Category-specific tags
  if (category === "product") {
    if (text.includes("pm") || text.includes("product manager")) tags.push("PM")
    if (text.includes("startup")) tags.push("Startup")
    if (text.includes("strategy")) tags.push("Strategy")
    if (text.includes("roadmap")) tags.push("Roadmap")
  }

  if (category === "stablecoins") {
    if (text.includes("usdc")) tags.push("USDC")
    if (text.includes("usdt")) tags.push("USDT")
    if (text.includes("dai")) tags.push("DAI")
    if (text.includes("defi")) tags.push("DeFi")
    if (text.includes("regulation")) tags.push("Regulation")
  }

  if (category === "tech-for-non-techs") {
    if (text.includes("api")) tags.push("API")
    if (text.includes("blockchain")) tags.push("Blockchain")
    if (text.includes("ai") || text.includes("artificial intelligence")) tags.push("AI")
    if (text.includes("tutorial")) tags.push("Tutorial")
  }

  if (category === "business") {
    if (text.includes("funding")) tags.push("Funding")
    if (text.includes("growth")) tags.push("Growth")
    if (text.includes("market")) tags.push("Market")
  }

  // Geographic tags
  if (text.includes("nigeria")) tags.push("Nigeria")
  if (text.includes("africa")) tags.push("Africa")

  return tags.slice(0, 4) // Limit to 4 tags
}
