import { NextResponse } from "next/server"
import { getSettings, saveSettings } from "@/lib/siteSettingsStorage"

export async function GET() {
  try {
    const settings = await getSettings()
    return NextResponse.json(settings)
  } catch (error) {
    console.error("Error reading site settings:", error)
    return NextResponse.json({ error: "Failed to read site settings" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const newSettings = await request.json()
    await saveSettings(newSettings)
    return NextResponse.json({ message: "Settings updated successfully" })
  } catch (error) {
    console.error("Error updating site settings:", error)
    return NextResponse.json({ error: "Failed to update site settings" }, { status: 500 })
  }
}

