import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 })
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Invalid email format" }, { status: 400 })
    }

    // Here you would typically:
    // 1. Store the email in your database
    // 2. Send a confirmation email
    // 3. Set up daily email notifications
    // 4. Check if email already exists

    console.log(`New subscription: ${email}`)

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    return NextResponse.json({
      success: true,
      message: "Successfully subscribed to daily notifications",
      email: email,
    })
  } catch (error) {
    console.error("Subscription error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { email } = await request.json()

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 })
    }

    // Here you would typically:
    // 1. Remove the email from your database
    // 2. Cancel email notifications
    // 3. Send unsubscribe confirmation

    console.log(`Unsubscribed: ${email}`)

    return NextResponse.json({
      success: true,
      message: "Successfully unsubscribed from notifications",
    })
  } catch (error) {
    console.error("Unsubscribe error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
