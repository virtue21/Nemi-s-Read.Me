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
  // Helper to construct the rss2json URL
  const buildUrl = (includeKey: boolean) => {
    const params = new URLSearchParams({
      rss_url: rssUrl,
      count: "10",
    })

    if (includeKey && process.env.RSS2JSON_API_KEY) {
      params.set("api_key", process.env.RSS2JSON_API_KEY)
    }

    return `https://api.rss2json.com/v1/api.json?${params.toString()}`
  }

  // Try with key first, then fallback without key
  const urlsToTry = [
    buildUrl(Boolean(process.env.RSS2JSON_API_KEY)),
    buildUrl(false), // fallback without key
  ]

  for (const url of urlsToTry) {
    try {
      const response = await fetch(url, {
        headers: {
          "User-Agent": "Mozilla/5.0 (compatible; NewsletterAggregator/1.0)",
        },
      })

      const data = await response.json()

      // Successful fetch
      if (data.status === "ok" && Array.isArray(data.items)) {
        return data.items.map((item: any, index: number) => ({
          id: `${source.name.replace(/\s+/g, "-")}-${index}-${Date.now()}`,
          title: item.title || "Untitled",
          source: source.name,
          category: source.category,
          geo: source.geo,
          frequency: source.frequency,
          date: formatDate(item.pubDate),
          link: item.link,
          summary: stripHtml(item.description || item.content || "").substring(0, 200) + "...",
          tags: generateTags(item.title, item.description, source.category, source.geo),
        }))
      }

      // If key is invalid, try without key
      if (
        data.status === "error" &&
        typeof data.message === "string" &&
        data.message.toLowerCase().includes("api_key")
      ) {
        console.warn(`Invalid api_key for rss2json – retrying ${source.name} without key`)
        continue // try next URL
      } else {
        // Other errors: log and return empty
        console.error(`Failed to fetch RSS for ${source.name}:`, data.message || "Unknown error")
        return []
      }
    } catch (err) {
      console.error(`Network error for ${source.name}:`, err)
      // continue to try next URL
    }
  }

  // All attempts failed
  console.error(`All attempts failed for ${source.name}`)
  return []
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

function generateTags(title: string, description: string, category: string, geo: string): string[] {
  const text = `${title} ${description}`.toLowerCase()
  const tags: string[] = []

  // Geographic tags first
  if (geo === "nigeria") tags.push("Nigeria")
  if (geo === "africa") tags.push("Africa")
  if (geo === "global") tags.push("Global")

  // Category-specific tags
  if (category === "product") {
    if (text.includes("pm") || text.includes("product manager")) tags.push("PM")
    if (text.includes("startup")) tags.push("Startup")
    if (text.includes("strategy")) tags.push("Strategy")
    if (text.includes("roadmap")) tags.push("Roadmap")
    if (text.includes("user") || text.includes("ux")) tags.push("UX")
  }

  if (category === "stablecoins") {
    if (text.includes("usdc")) tags.push("USDC")
    if (text.includes("usdt")) tags.push("USDT")
    if (text.includes("dai")) tags.push("DAI")
    if (text.includes("defi")) tags.push("DeFi")
    if (text.includes("regulation")) tags.push("Regulation")
    if (text.includes("bitcoin")) tags.push("Bitcoin")
    if (text.includes("ethereum")) tags.push("Ethereum")
    if (text.includes("crypto")) tags.push("Crypto")
  }

  if (category === "tech-for-non-techs") {
    if (text.includes("api")) tags.push("API")
    if (text.includes("blockchain")) tags.push("Blockchain")
    if (text.includes("ai") || text.includes("artificial intelligence")) tags.push("AI")
    if (text.includes("tutorial")) tags.push("Tutorial")
    if (text.includes("beginner")) tags.push("Beginner")
    if (text.includes("explained")) tags.push("Explained")
  }

  if (category === "business") {
    if (text.includes("funding")) tags.push("Funding")
    if (text.includes("growth")) tags.push("Growth")
    if (text.includes("market")) tags.push("Market")
    if (text.includes("investment")) tags.push("Investment")
    if (text.includes("revenue")) tags.push("Revenue")
    if (text.includes("leadership")) tags.push("Leadership")
  }

  // Common tech terms
  const techTerms = ["saas", "fintech", "web3", "mobile", "cloud", "data"]
  techTerms.forEach((term) => {
    if (text.includes(term)) tags.push(term.toUpperCase())
  })

  return tags.slice(0, 4) // Limit to 4 tags
}
