import { NextResponse } from "next/server"
import { getSettings } from "@/lib/siteSettingsStorage"

export async function POST(req: Request) {
  try {
    const { message } = await req.json()
    const settings = await getSettings()
    const { telegramBotToken, telegramChatId } = settings

    if (!telegramBotToken || !telegramChatId) {
      console.warn("Telegram settings are not configured")
      return NextResponse.json({ error: "Telegram settings are not configured" }, { status: 400 })
    }

    const response = await fetch(`https://api.telegram.org/bot${telegramBotToken}/sendMessage`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: telegramChatId,
        text: message,
        parse_mode: "HTML",
      }),
    })

    if (!response.ok) {
      const errorData = await response.json()
      console.error("Telegram API error:", errorData)
      return NextResponse.json(
        { error: `Telegram API error: ${JSON.stringify(errorData)}` },
        { status: response.status },
      )
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error sending Telegram message:", error)
    return NextResponse.json({ error: "Failed to send Telegram message" }, { status: 500 })
  }
}

