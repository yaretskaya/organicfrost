"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { X, Snowflake } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { toast } from "react-hot-toast"
import { useLanguage } from "@/contexts/LanguageContext"
import { getTranslation } from "@/utils/translations"

interface Product {
  id: number
  name: {
    uk: string
    en: string
    de: string
    pl: string
  }
  image: string
}

interface QuoteModalProps {
  isOpen: boolean
  onClose: () => void
  product: Product | null
  onQuoteSubmitted: () => void
}

export default function QuoteModal({ isOpen, onClose, product, onQuoteSubmitted }: QuoteModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    volume: "",
    message: "",
    country: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { language } = useLanguage()

  if (!isOpen || !product) return null

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    try {
      const quoteData = {
        product: product.name[language as keyof typeof product.name],
        ...formData,
      }

      const quoteResponse = await fetch("/api/quotes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(quoteData),
      })

      if (!quoteResponse.ok) {
        throw new Error(
          `${getTranslation("errorSendingQuote", language)}: ${quoteResponse.status} ${quoteResponse.statusText}`,
        )
      }

      const quoteResult = await quoteResponse.json()
      console.log(getTranslation("serverResponse", language), quoteResult)

      if (quoteResult) {
        try {
          const telegramMessage = `
<b>Нова заявка на прайс:</b>
Продукт: ${quoteData.product}
Ім'я: ${quoteData.name}
Компанія: ${quoteData.company}
Email: ${quoteData.email}
Телефон: ${quoteData.phone}
Об'єм: ${quoteData.volume}
Країна: ${quoteData.country}
Повідомлення: ${quoteData.message}
          `

          const telegramResponse = await fetch("/api/telegram", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ message: telegramMessage }),
          })

          if (!telegramResponse.ok) {
            const errorData = await telegramResponse.json()
            if (errorData.error === "Telegram settings are not configured") {
              console.warn("Telegram settings are not configured. Message not sent.")
            } else {
              console.error("Failed to send Telegram message:", errorData.error)
            }
          }
        } catch (telegramError) {
          console.error("Error sending Telegram message:", telegramError)
        }

        setFormData({
          name: "",
          company: "",
          email: "",
          phone: "",
          volume: "",
          message: "",
          country: "",
        })

        toast.success(getTranslation("quoteSubmittedSuccess", language), {
          duration: 5000,
          position: "top-center",
          style: {
            background: "#10B981",
            color: "#fff",
            fontSize: "16px",
            padding: "16px",
            borderRadius: "8px",
          },
        })
        onQuoteSubmitted()
        onClose()
      }
    } catch (error) {
      console.error(getTranslation("error", language), error)
      let errorMessage = getTranslation("errorSendingQuote", language)
      if (error instanceof Error) {
        errorMessage += `: ${error.message}`
      } else {
        errorMessage += `: ${getTranslation("unknownError", language)}`
      }
      toast.error(errorMessage)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Snowflake className="h-5 w-5 text-blue-500" />
                <h2 className="text-2xl font-bold">{getTranslation("requestQuote", language)}</h2>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="secondary">{product.name[language as keyof typeof product.name]}</Badge>
                <Badge variant="outline">{getTranslation("deepFrozen", language)}</Badge>
              </div>
            </div>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <X size={24} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-1">
                  {getTranslation("yourName", language)}
                </label>
                <Input id="name" name="name" value={formData.name} onChange={handleChange} required />
              </div>
              <div>
                <label htmlFor="company" className="block text-sm font-medium mb-1">
                  {getTranslation("company", language)}
                </label>
                <Input id="company" name="company" value={formData.company} onChange={handleChange} required />
              </div>
            </div>

            <div>
              <label htmlFor="country" className="block text-sm font-medium mb-1">
                {getTranslation("country", language)}
              </label>
              <Input id="country" name="country" value={formData.country} onChange={handleChange} required />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-1">
                  {getTranslation("email", language)}
                </label>
                <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} required />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium mb-1">
                  {getTranslation("phone", language)}
                </label>
                <Input id="phone" name="phone" type="tel" value={formData.phone} onChange={handleChange} required />
              </div>
            </div>

            <div>
              <label htmlFor="volume" className="block text-sm font-medium mb-1">
                {getTranslation("requiredVolume", language)}
              </label>
              <Input id="volume" name="volume" type="text" value={formData.volume} onChange={handleChange} required />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium mb-1">
                {getTranslation("additionalInfo", language)}
              </label>
              <Textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder={getTranslation("additionalInfoPlaceholder", language)}
                className="min-h-[100px]"
              />
            </div>

            <Button type="submit" className="w-full bg-cyan-500 hover:bg-cyan-600" disabled={isSubmitting}>
              {isSubmitting
                ? getTranslation("sending", language)
                : getTranslation("sendRequestForFrozenProduct", language)}
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}

