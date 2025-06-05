"use client"

import Link from "next/link"
import { Facebook, Instagram, Twitter } from "lucide-react"
import { useLanguage } from "@/contexts/LanguageContext"
import { getTranslation } from "@/utils/translations"
import { useSiteSettings } from "@/hooks/useSiteSettings"

export default function Footer() {
  const { language } = useLanguage()
  const { settings, isLoading, error } = useSiteSettings()

  if (isLoading) {
    return (
      <footer className="bg-gray-900 text-white mt-12 py-8">
        <div className="container mx-auto px-4">
          <p className="text-center">Loading...</p>
        </div>
      </footer>
    )
  }

  if (error) {
    console.error(error)
    // Continue with default settings
  }

  return (
    <footer className="bg-gray-900 text-white mt-12">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">{getTranslation("aboutUs", language)}</h3>
            <p className="text-gray-300">
              ORGANIC FROST пропонує преміальні заморожені фрукти, ягоди та овочі. Наші продукти ретельно відібрані та
              заморожені на піку свіжості.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">{getTranslation("quickLinks", language)}</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/faq" className="text-gray-300 hover:text-cyan-400 transition">
                  {getTranslation("faq", language)}
                </Link>
              </li>
              <li>
                <Link href="/delivery" className="text-gray-300 hover:text-cyan-400 transition">
                  {getTranslation("delivery", language)}
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">{getTranslation("contactUs", language)}</h3>
            <p className="text-gray-300">Email: {settings.email}</p>
            <p className="text-gray-300">
              {getTranslation("phone", language)}: {settings.phone}
            </p>
            <p className="text-gray-300">
              {getTranslation("addressLabel", language)}: {settings.address}
            </p>
            <div className="flex space-x-4 mt-4">
              <a href="#" className="text-gray-300 hover:text-cyan-400 transition">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-cyan-400 transition">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-cyan-400 transition">
                <Twitter size={20} />
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-300">
          © 2023 {settings.companyName}. {getTranslation("allRightsReserved", language)}
        </div>
      </div>
    </footer>
  )
}

