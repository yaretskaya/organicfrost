"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { languages, defaultLanguage } from "@/config/languages"

type LanguageContextType = {
  language: string
  setLanguage: (lang: string) => void
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState(defaultLanguage)
  const [isInitialized, setIsInitialized] = useState(false)

  useEffect(() => {
    const storedLanguage = localStorage.getItem("language")
    if (storedLanguage && languages.some((lang) => lang.code === storedLanguage)) {
      setLanguage(storedLanguage)
    }
    setIsInitialized(true)
  }, [])

  const handleSetLanguage = (lang: string) => {
    setLanguage(lang)
    localStorage.setItem("language", lang)
  }

  if (!isInitialized) {
    return null // Prevent flash of untranslated content
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage }}>{children}</LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}

