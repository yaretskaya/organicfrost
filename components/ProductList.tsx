"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import QuoteModal from "./QuoteModal"
import { ShoppingCart, Snowflake } from "lucide-react"
import { useLanguage } from "@/contexts/LanguageContext"
import { getTranslation } from "@/utils/translations"

interface ProductPrices {
  uah: number
  usd: number
  eur: number
  pln: number // Add Polish Złoty
}

interface Product {
  id: number
  name: {
    uk: string
    en: string
    de: string
    pl: string
  }
  prices: ProductPrices | undefined // Updated to allow undefined
  category: string
}

interface ProductListProps {
  category: string
}

const getCurrencySymbol = (language: string) => {
  switch (language) {
    case "uk":
      return "₴"
    case "en":
      return "$"
    case "de":
      return "€"
    case "pl":
      return "zł"
    default:
      return "₴"
  }
}

const getPrice = (prices: ProductPrices | undefined, language: string) => {
  if (!prices) return 0 // Return 0 if prices object is undefined

  switch (language) {
    case "uk":
      return prices.uah ?? 0
    case "en":
      return prices.usd ?? 0
    case "de":
      return prices.eur ?? 0
    case "pl":
      return prices.pln ?? 0
    default:
      return prices.uah ?? 0 // Default to UAH if language is not recognized
  }
}

export default function ProductList({ category }: ProductListProps) {
  const [products, setProducts] = useState<Product[]>([])
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const { language } = useLanguage()

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true)
      try {
        const res = await fetch(`/api/products?category=${category}&lang=${language}`)
        if (!res.ok) throw new Error(getTranslation("failedToFetchProducts", language))
        const data = await res.json()
        setProducts(data)
      } catch (error) {
        console.error(getTranslation("errorFetchingProducts", language), error)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [category, language])

  const fetchQuotes = async () => {
    try {
      const res = await fetch("/api/quotes", {
        headers: {
          Authorization: "Basic YWRtaW46MTIzNDU2",
        },
        cache: "no-store",
      })
      if (!res.ok) throw new Error(getTranslation("errorLoadingQuotes", language))
      await res.json()
    } catch (error) {
      console.error(getTranslation("errorUpdatingQuotes", language), error)
    }
  }

  if (loading) {
    return <div className="text-center py-10">{getTranslation("loading", language)}</div>
  }

  const getCategoryTranslation = (category: string) => {
    switch (category) {
      case "berries":
        return getTranslation("frozenBerries", language)
      case "fruits":
        return getTranslation("frozenFruits", language)
      case "vegetables":
        return getTranslation("frozenVegetables", language)
      default:
        return category
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "berries":
        return "bg-pink-100 text-pink-800 hover:bg-pink-200"
      case "fruits":
        return "bg-orange-100 text-orange-800 hover:bg-orange-200"
      case "vegetables":
        return "bg-green-100 text-green-800 hover:bg-green-200"
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-200"
    }
  }

  const currencySymbol = getCurrencySymbol(language)

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card className="h-full flex flex-col justify-between hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <Badge className={getCategoryColor(category)}>{getCategoryTranslation(category)}</Badge>
                  <Snowflake className="h-5 w-5 text-blue-400" />
                </div>
                <CardTitle className="text-xl">{product.name[language as keyof typeof product.name]}</CardTitle>
                <CardDescription>
                  {getTranslation("premiumQuality", language)} | {getTranslation("shockFrozen", language)}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center text-sm text-gray-600">
                    <span className="inline-block w-4 h-4 rounded-full mr-2 bg-blue-500" />
                    {getTranslation("deepFrozen", language)}
                  </div>
                  <div className="text-sm text-gray-600">{getTranslation("minimumOrder", language)}: 10 kg</div>
                  <div className="text-lg font-semibold text-cyan-600">
                    {currencySymbol} {getPrice(product.prices, language).toFixed(2)} / kg
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={() => setSelectedProduct(product)} className="w-full bg-cyan-500 hover:bg-cyan-600">
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  {getTranslation("requestPrice", language)}
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </div>

      <QuoteModal
        isOpen={!!selectedProduct}
        onClose={() => setSelectedProduct(null)}
        product={selectedProduct}
        onQuoteSubmitted={fetchQuotes}
      />
    </>
  )
}

