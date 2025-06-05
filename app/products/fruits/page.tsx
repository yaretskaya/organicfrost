"use client"

import ProductList from "@/components/ProductList"
import { useLanguage } from "@/contexts/LanguageContext"
import { getTranslation } from "@/utils/translations"

export default function FruitsPage() {
  const { language } = useLanguage()

  return (
    <div className="container mx-auto px-4 py-8 pt-32">
      <h1 className="text-3xl font-bold mb-8">{getTranslation("fruits", language)}</h1>
      <ProductList category="fruits" />
    </div>
  )
}

