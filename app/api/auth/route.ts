import { NextResponse } from "next/server"
import { hashPassword, verifyPassword } from "@/utils/passwordUtils"

export async function POST(req: Request) {
  try {
    const { action, password, newPassword } = await req.json()

    // Get the stored password hash
    const storedHash = localStorage.getItem("adminPasswordHash")
    if (!storedHash) {
      return NextResponse.json({ error: "No password hash found" }, { status: 404 })
    }

    if (action === "verify") {
      const isValid = await verifyPassword(password, storedHash)
      return NextResponse.json({ isValid })
    }

    if (action === "change" && newPassword) {
      // Verify current password first
      const isValid = await verifyPassword(password, storedHash)
      if (!isValid) {
        return NextResponse.json({ error: "Current password is incorrect" }, { status: 401 })
      }

      // Hash and store new password
      const newHash = await hashPassword(newPassword)
      localStorage.setItem("adminPasswordHash", newHash)
      return NextResponse.json({ success: true })
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 })
  } catch (error) {
    console.error("Auth error:", error)
    return NextResponse.json({ error: "Authentication failed" }, { status: 500 })
  }
}

