"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/contexts/LanguageContext"
import { getTranslation } from "@/utils/translations"

export default function AboutPage() {
  const { language } = useLanguage()

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  }

  return (
    <motion.div className="container mx-auto px-4 py-8" variants={containerVariants} initial="hidden" animate="visible">
      <motion.h1 className="text-4xl font-bold mb-8 text-center" variants={itemVariants}>
        {getTranslation("aboutCompanyTitle", language)}
      </motion.h1>

      <motion.div className="grid md:grid-cols-2 gap-8 items-center mb-12" variants={itemVariants}>
        <div>
          <Image
            src="/placeholder.svg?height=400&width=600"
            alt={getTranslation("ourProduction", language)}
            width={600}
            height={400}
            className="rounded-lg shadow-lg"
          />
        </div>
        <div>
          <motion.h2 className="text-2xl font-semibold mb-4" variants={itemVariants}>
            {getTranslation("ourMission", language)}
          </motion.h2>
          <motion.p className="text-lg mb-4" variants={itemVariants}>
            {getTranslation("missionText1", language)}
          </motion.p>
          <motion.p className="text-lg" variants={itemVariants}>
            {getTranslation("missionText2", language)}
          </motion.p>
        </div>
      </motion.div>

      <motion.div className="mb-12" variants={itemVariants}>
        <h2 className="text-2xl font-semibold mb-4">{getTranslation("ourHistory", language)}</h2>
        <p className="text-lg mb-4">{getTranslation("historyText1", language)}</p>
        <p className="text-lg">{getTranslation("historyText2", language)}</p>
      </motion.div>

      <motion.div className="bg-gray-100 rounded-lg p-8 mb-12" variants={itemVariants}>
        <h2 className="text-2xl font-semibold mb-4">{getTranslation("ourAdvantages", language)}</h2>
        <ul className="list-disc list-inside space-y-2 text-lg">
          <li>{getTranslation("advantage1", language)}</li>
          <li>{getTranslation("advantage2", language)}</li>
          <li>{getTranslation("advantage3", language)}</li>
          <li>{getTranslation("advantage4", language)}</li>
          <li>{getTranslation("advantage5", language)}</li>
        </ul>
      </motion.div>

      <motion.div className="text-center" variants={itemVariants}>
        <h2 className="text-2xl font-semibold mb-4">{getTranslation("becomePartner", language)}</h2>
        <p className="text-lg mb-6">{getTranslation("partnerText", language)}</p>
        <Button size="lg" className="bg-cyan-500 hover:bg-cyan-600">
          {getTranslation("contactUs", language)}
        </Button>
      </motion.div>
    </motion.div>
  )
}

