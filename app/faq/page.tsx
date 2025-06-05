"use client"

import { useState } from "react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { motion } from "framer-motion"
import { HelpCircle } from "lucide-react"
import { useLanguage } from "@/contexts/LanguageContext"
import { getTranslation } from "@/utils/translations"

const faqs = [
  {
    question: "Як здійснюється доставка замороженої продукції?",
    answer:
      "Доставка здійснюється спеціалізованим холодильним транспортом, який підтримує необхідну температуру протягом усього шляху.",
  },
  {
    question: "Який мінімальний обсяг замовлення?",
    answer: "Мінімальний обсяг замовлення становить 10 кг для кожного виду продукції.",
  },
  {
    question: "Як довго зберігається заморожена продукція?",
    answer: "При дотриманні температурного режиму (-18°C) термін зберігання становить до 24 місяців.",
  },
  {
    question: "Чи є сертифікати якості на продукцію?",
    answer: "Так, вся наша продукція має необхідні сертифікати якості та відповідає міжнародним стандартам.",
  },
  {
    question: "Як отримати оптовий прайс-лист?",
    answer:
      "Ви можете запросити актуальний прайс-лист, заповнивши форму на нашому сайті або зв'язавшись з нами по телефону.",
  },
]

export default function FAQPage() {
  const [expandedItems, setExpandedItems] = useState<string[]>([])
  const { language } = useLanguage()

  const handleAccordionChange = (value: string) => {
    setExpandedItems((prev) => (prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]))
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-cyan-50 to-blue-100 pt-24">
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <HelpCircle className="w-16 h-16 text-cyan-500 mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-gray-800 mb-4">{getTranslation("faqTitle", language)}</h1>
          <p className="text-xl text-gray-600">{getTranslation("faqSubtitle", language)}</p>
        </motion.div>
        <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-xl overflow-hidden">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <AccordionItem value={`item-${index}`}>
                  <AccordionTrigger
                    onClick={() => handleAccordionChange(`item-${index}`)}
                    className="px-6 py-4 text-left hover:bg-gray-50 transition-all duration-200"
                  >
                    <div className="flex items-center">
                      <span className="text-lg font-semibold text-gray-700">
                        {language === "uk" ? faq.question : getTranslation(`faqQuestion${index + 1}`, language)}
                      </span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 py-4 bg-gray-50">
                    <p className="text-gray-600 leading-relaxed">
                      {language === "uk" ? faq.answer : getTranslation(`faqAnswer${index + 1}`, language)}
                    </p>
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </div>
      </div>
    </div>
  )
}

