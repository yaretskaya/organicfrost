"use client"

import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { useLanguage } from "@/contexts/LanguageContext"
import { getTranslation } from "@/utils/translations"
import type React from "react" // Added import for React

export default function Hero() {
  const { language } = useLanguage()

  const scrollToQuoteForm = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    const quoteForm = document.getElementById("quote-form")
    if (quoteForm) {
      const windowHeight = window.innerHeight
      const quoteFormHeight = quoteForm.getBoundingClientRect().height
      const centerOffset = Math.max((windowHeight - quoteFormHeight) / 2, 0)
      const quoteFormTop = quoteForm.getBoundingClientRect().top + window.pageYOffset

      window.scrollTo({
        top: quoteFormTop - centerOffset,
        behavior: "smooth",
      })
    }
  }

  return (
    <div className="relative h-[600px] bg-gradient-to-r from-cyan-500 to-blue-500">
      <div className="absolute inset-0 flex items-center">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">{getTranslation("heroTitle", language)}</h1>
            <p className="text-xl text-white mb-8">{getTranslation("heroDescription", language)}</p>
            <Button
              size="lg"
              className="bg-white text-blue-600 hover:bg-cyan-100 transition"
              onClick={scrollToQuoteForm}
            >
              {getTranslation("requestPrice", language)}
            </Button>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

