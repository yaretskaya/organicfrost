"use client"

import { motion } from "framer-motion"
import { useLanguage } from "@/contexts/LanguageContext"
import { getTranslation } from "@/utils/translations"

export default function CallToAction() {
  const { language } = useLanguage()

  return (
    <section className="py-16 bg-gradient-to-r from-cyan-500 to-blue-500 text-white">
      <div className="container mx-auto px-4 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <h2 className="text-3xl font-bold mb-4">{getTranslation("readyToCollaborate", language)}</h2>
          <p className="text-xl mb-8">{getTranslation("collaborationText", language)}</p>
        </motion.div>
      </div>
    </section>
  )
}

