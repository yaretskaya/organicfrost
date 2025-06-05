"use client"

import { motion } from "framer-motion"
import { Truck, Package, ThermometerSnowflake, Clock, CheckCircle } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useLanguage } from "@/contexts/LanguageContext"
import { getTranslation } from "@/utils/translations"

const deliverySteps = [
  {
    icon: Package,
    titleKey: "packagingTitle",
    descriptionKey: "packagingDescription",
  },
  {
    icon: ThermometerSnowflake,
    titleKey: "temperatureControlTitle",
    descriptionKey: "temperatureControlDescription",
  },
  {
    icon: Truck,
    titleKey: "transportationTitle",
    descriptionKey: "transportationDescription",
  },
  {
    icon: Clock,
    titleKey: "timelinessTitle",
    descriptionKey: "timelinessDescription",
  },
  {
    icon: CheckCircle,
    titleKey: "qualityControlTitle",
    descriptionKey: "qualityControlDescription",
  },
]

export default function DeliveryPage() {
  const { language } = useLanguage()

  return (
    <div className="min-h-screen bg-gradient-to-b from-cyan-50 to-blue-100 pt-24">
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <Truck className="w-16 h-16 text-cyan-500 mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-gray-800 mb-4">{getTranslation("deliveryTitle", language)}</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">{getTranslation("deliveryDescription", language)}</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {deliverySteps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full">
                <CardHeader>
                  <step.icon className="w-10 h-10 text-cyan-500 mb-2" />
                  <CardTitle>{getTranslation(step.titleKey, language)}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{getTranslation(step.descriptionKey, language)}</CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

