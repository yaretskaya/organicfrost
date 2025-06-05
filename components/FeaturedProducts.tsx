"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { useLanguage } from "@/contexts/LanguageContext"
import { getTranslation } from "@/utils/translations"

interface Product {
  id: number
  name: {
    uk: string
    en: string
    de: string
  }
  category: string
}

interface ProductCategory {
  id: string
  name: string
  description: string
  image: string
  link: string
}

const productCategories: ProductCategory[] = [
  {
    id: "berries",
    name: "berries",
    description: "berriesDescription",
    image: "https://images.unsplash.com/photo-1577069861033-55d04cec4ef5?auto=format&fit=crop&q=80",
    link: "/products/berries",
  },
  {
    id: "fruits",
    name: "fruits",
    description: "fruitsDescription",
    image: "https://images.unsplash.com/photo-1570913149827-d2ac84ab3f9a?auto=format&fit=crop&q=80",
    link: "/products/fruits",
  },
  {
    id: "vegetables",
    name: "vegetables",
    description: "vegetablesDescription",
    image: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&q=80",
    link: "/products/vegetables",
  },
]

export default function FeaturedProducts() {
  const [products, setProducts] = useState<Record<string, Product[]>>({})
  const [error, setError] = useState<string | null>(null)
  const { language } = useLanguage()

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("/api/products")
        if (!response.ok) {
          throw new Error("Failed to fetch products")
        }
        const data = await response.json()
        console.log("Fetched products:", data) // Debug log
        setProducts(data)
        setError(null)
      } catch (err) {
        console.error("Error fetching products:", err)
        setError("Failed to load products")
      }
    }

    fetchProducts()
  }, [])

  if (error) {
    console.error("Error state:", error)
    return <div className="text-center text-red-500">{error}</div>
  }

  return (
    <section id="product-categories">
      <h2 className="text-3xl font-bold mb-8 text-center">{getTranslation("productCategories", language)}</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {productCategories.map((category, index) => {
          const categoryProducts = products[category.id] || []
          console.log(`Products for ${category.id}:`, categoryProducts) // Debug log

          return (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative"
            >
              <Link href={category.link} className="block">
                <div className="relative h-[500px] rounded-xl overflow-hidden">
                  <Image
                    src={category.image || "/placeholder.svg"}
                    alt={getTranslation(category.name, language)}
                    layout="fill"
                    objectFit="cover"
                    className="transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent">
                    <div className="absolute bottom-0 left-0 right-0 p-8">
                      <h3 className="text-3xl font-bold text-white mb-3">{getTranslation(category.name, language)}</h3>
                      <p className="text-gray-200 mb-4">{getTranslation(category.description, language)}</p>
                      <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                        <p className="text-gray-100 text-sm">
                          {categoryProducts.length > 0
                            ? categoryProducts
                                .map((product) => product.name[language as keyof typeof product.name])
                                .join(" • ")
                            : "Loading products..."}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}

