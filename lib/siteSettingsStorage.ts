import fs from "fs/promises"
import path from "path"

const dataDir = path.join(process.cwd(), "data")
const settingsFile = path.join(dataDir, "site-settings.json")

export interface SiteSettings {
  companyName: string
  phone: string
  email: string
  address: string
  telegramBotToken: string
  telegramChatId: string
}

const defaultSettings: SiteSettings = {
  companyName: "ORGANIC FROST",
  phone: "+380 123 456 789",
  email: "info@organicfrost.com",
  address: "Kyiv, Ukraine",
  telegramBotToken: "",
  telegramChatId: "",
}

async function ensureDataDir() {
  try {
    await fs.access(dataDir)
  } catch {
    await fs.mkdir(dataDir, { recursive: true })
  }
}

async function ensureSettingsFile() {
  try {
    await fs.access(settingsFile)
    const data = await fs.readFile(settingsFile, "utf-8")
    const settings = JSON.parse(data)
    if (Object.keys(settings).length === 0) {
      await fs.writeFile(settingsFile, JSON.stringify(defaultSettings, null, 2))
    }
  } catch {
    await fs.writeFile(settingsFile, JSON.stringify(defaultSettings, null, 2))
  }
}

export async function getSettings(): Promise<SiteSettings> {
  try {
    await ensureDataDir()
    await ensureSettingsFile()
    const data = await fs.readFile(settingsFile, "utf-8")
    return JSON.parse(data)
  } catch (error) {
    console.error("Error reading settings:", error)
    return defaultSettings
  }
}

export async function saveSettings(settings: SiteSettings): Promise<void> {
  try {
    await ensureDataDir()
    await fs.writeFile(settingsFile, JSON.stringify(settings, null, 2))
  } catch (error) {
    console.error("Error saving settings:", error)
  }
}

