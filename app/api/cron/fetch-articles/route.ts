import { NextResponse } from "next/server"

// This endpoint can be called by a cron job (like Vercel Cron) to automatically fetch articles
export async function GET() {
  try {
    // Call the fetch articles endpoint
    const baseUrl = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000"

    const response = await fetch(`${baseUrl}/api/articles/fetch`, {
      method: "GET",
    })

    const data = await response.json()

    console.log("Cron job completed:", data)

    return NextResponse.json({
      success: true,
      message: "Articles fetched successfully",
      articlesCount: data.total,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error("Cron job failed:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch articles" }, { status: 500 })
  }
}
