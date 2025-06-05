"use client"

import { useState, useEffect } from "react"

interface SiteSettings {
  companyName: string
  phone: string
  email: string
  address: string
}

const defaultSettings: SiteSettings = {
  companyName: "ORGANIC FROST",
  phone: "+380 123 456 789",
  email: "info@organicfrost.com",
  address: "Kyiv, Ukraine",
}

export function useSiteSettings() {
  const [settings, setSettings] = useState<SiteSettings>(defaultSettings)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchSettings() {
      try {
        setIsLoading(true)
        const response = await fetch("/api/site-settings")
        if (response.ok) {
          const data = await response.json()
          setSettings(data)
        } else {
          throw new Error("Failed to fetch site settings")
        }
      } catch (error) {
        console.error("Failed to fetch site settings:", error)
        setError("Failed to load site settings. Using default values.")
      } finally {
        setIsLoading(false)
      }
    }

    fetchSettings()
  }, [])

  return { settings, isLoading, error }
}

