import { type NextRequest, NextResponse } from "next/server"

interface CategoryRequest {
  title: string
  content: string
  source: string
}

export async function POST(request: NextRequest) {
  try {
    const { title, content, source }: CategoryRequest = await request.json()

    const text = `${title} ${content}`.toLowerCase()

    // AI-powered categorization logic
    const category = categorizeContent(text, source)
    const geo = determineGeoFocus(text, source)
    const frequency = determineFrequency(source)
    const tags = generateSmartTags(text, category)

    return NextResponse.json({
      category,
      geo,
      frequency,
      tags,
      summary: generateSummary(content),
    })
  } catch (error) {
    console.error("Categorization error:", error)
    return NextResponse.json({ error: "Failed to categorize content" }, { status: 500 })
  }
}

function categorizeContent(text: string, source: string): string {
  // Product Management keywords
  if (
    text.includes("product manager") ||
    text.includes("product management") ||
    text.includes("roadmap") ||
    text.includes("user experience") ||
    text.includes("product strategy") ||
    source.toLowerCase().includes("product")
  ) {
    return "product"
  }

  // Stablecoins keywords
  if (
    text.includes("stablecoin") ||
    text.includes("usdc") ||
    text.includes("usdt") ||
    text.includes("dai") ||
    text.includes("crypto") ||
    text.includes("defi") ||
    source.toLowerCase().includes("crypto") ||
    source.toLowerCase().includes("coin")
  ) {
    return "stablecoins"
  }

  // Tech for non-techs keywords
  if (
    text.includes("api") ||
    text.includes("blockchain explained") ||
    text.includes("technical concepts") ||
    text.includes("beginner") ||
    text.includes("simplified") ||
    text.includes("non-technical")
  ) {
    return "tech-for-non-techs"
  }

  // Business keywords
  if (
    text.includes("business model") ||
    text.includes("startup") ||
    text.includes("funding") ||
    text.includes("market") ||
    text.includes("strategy") ||
    text.includes("growth")
  ) {
    return "business"
  }

  // Default categorization based on source
  if (source.toLowerCase().includes("product")) return "product"
  if (source.toLowerCase().includes("crypto") || source.toLowerCase().includes("coin")) return "stablecoins"
  if (source.toLowerCase().includes("tech")) return "tech-for-non-techs"

  return "business" // Default fallback
}

function determineGeoFocus(text: string, source: string): string {
  if (text.includes("nigeria") || source.toLowerCase().includes("nigeria")) {
    return "nigeria"
  }
  if (text.includes("africa") || source.toLowerCase().includes("africa")) {
    return "africa"
  }
  return "global"
}

function determineFrequency(source: string): string {
  // You can customize this based on known publication schedules
  const dailySources = ["techcabal", "coindesk", "stackoverflow"]
  const weeklySources = ["lenny", "bankless", "circle"]

  const sourceLower = source.toLowerCase()

  if (dailySources.some((daily) => sourceLower.includes(daily))) {
    return "daily"
  }
  if (weeklySources.some((weekly) => sourceLower.includes(weekly))) {
    return "weekly"
  }

  return "weekly" // Default
}

function generateSmartTags(text: string, category: string): string[] {
  const tags: string[] = []

  // Common tech tags
  const techTerms = ["ai", "blockchain", "api", "saas", "fintech", "web3", "defi"]
  techTerms.forEach((term) => {
    if (text.includes(term)) tags.push(term.toUpperCase())
  })

  // Geographic tags
  if (text.includes("nigeria")) tags.push("Nigeria")
  if (text.includes("africa")) tags.push("Africa")

  // Category-specific tags
  if (category === "product") {
    if (text.includes("pm")) tags.push("PM")
    if (text.includes("ux")) tags.push("UX")
  }

  return tags.slice(0, 4)
}

function generateSummary(content: string): string {
  // Simple summary generation - first 150 characters
  const cleaned = content.replace(/<[^>]*>/g, "").trim()
  return cleaned.length > 150 ? cleaned.substring(0, 150) + "..." : cleaned
}
