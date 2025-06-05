import ukTranslations from "@/locales/uk.json"
import enTranslations from "@/locales/en.json"
import deTranslations from "@/locales/de.json"
import plTranslations from "@/locales/pl.json"

const translations: { [key: string]: { [key: string]: string } } = {
  uk: ukTranslations,
  en: enTranslations,
  de: deTranslations,
  pl: plTranslations,
}

export function getTranslation(key: string, language: string): string {
  try {
    if (!key) return ""

    const translation = translations[language]?.[key]
    if (!translation) {
      console.warn(`Translation missing for key "${key}" in language "${language}"`)
      // Fallback chain: requested language -> Ukrainian -> key
      return translations.uk[key] || key
    }
    return translation
  } catch (error) {
    console.error(`Error getting translation for key "${key}" in language "${language}":`, error)
    return key
  }
}

