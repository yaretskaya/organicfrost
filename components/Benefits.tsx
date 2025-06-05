"use client"

import { motion } from "framer-motion"
import { Leaf, Award, Truck, DollarSign, ThumbsUp, Scale } from "lucide-react"
import { useLanguage } from "@/contexts/LanguageContext"
import { getTranslation } from "@/utils/translations"

const benefits = [
  { icon: Leaf, title: "naturalness", description: "naturalnessDescription" },
  { icon: Award, title: "highQuality", description: "highQualityDescription" },
  { icon: Truck, title: "reliableDelivery", description: "reliableDeliveryDescription" },
  { icon: DollarSign, title: "favorableTerms", description: "favorableTermsDescription" },
  { icon: ThumbsUp, title: "easeOfUse", description: "easeOfUseDescription" },
  { icon: Scale, title: "portionAccuracy", description: "portionAccuracyDescription" },
]

export default function Benefits() {
  const { language } = useLanguage()

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">{getTranslation("benefitsTitle", language)}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex flex-col items-center text-center"
            >
              <benefit.icon className="w-12 h-12 text-cyan-500 mb-4" />
              <h3 className="text-xl font-semibold mb-2">{getTranslation(benefit.title, language)}</h3>
              <p className="text-gray-600">{getTranslation(benefit.description, language)}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

