"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { motion } from "framer-motion"
import { useLanguage } from "@/contexts/LanguageContext"
import { getTranslation } from "@/utils/translations"
import { toast } from "react-hot-toast"

export default function QuoteForm() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    message: "",
  })
  const formRef = useRef<HTMLDivElement>(null)
  const { language } = useLanguage()

  useEffect(() => {
    const adjustFormPosition = () => {
      if (formRef.current) {
        const windowHeight = window.innerHeight
        const formHeight = formRef.current.getBoundingClientRect().height
        const centerOffset = Math.max((windowHeight - formHeight) / 2, 0)
        formRef.current.style.marginTop = `${centerOffset}px`
      }
    }

    adjustFormPosition()
    window.addEventListener("resize", adjustFormPosition)

    return () => {
      window.removeEventListener("resize", adjustFormPosition)
    }
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      // Format message for Telegram
      const telegramMessage = `
<b>Новий запит на розрахунок:</b>
Ім'я: ${formData.name}
Телефон: ${formData.phone}
Повідомлення: ${formData.message}
      `

      // Send to Telegram
      try {
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

      // Show success notification
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

      // Reset form
      setFormData({
        name: "",
        phone: "",
        message: "",
      })
    } catch (error) {
      toast.error(getTranslation("errorSendingQuote", language))
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  return (
    <motion.section
      id="quote-form"
      ref={formRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="bg-white shadow-lg rounded-xl p-8 max-w-2xl mx-auto my-12 scroll-mt-24"
    >
      <h2 className="text-2xl font-bold mb-6 text-center">{getTranslation("requestQuote", language)}</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium mb-1">
            {getTranslation("yourName", language)}
          </label>
          <Input id="name" name="name" value={formData.name} onChange={handleChange} required />
        </div>
        <div>
          <label htmlFor="phone" className="block text-sm font-medium mb-1">
            {getTranslation("phone", language)}
          </label>
          <Input id="phone" name="phone" type="tel" value={formData.phone} onChange={handleChange} required />
        </div>
        <div>
          <label htmlFor="message" className="block text-sm font-medium mb-1">
            {getTranslation("message", language)}
          </label>
          <Textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder={getTranslation("messagePlaceholder", language)}
            className="min-h-[100px]"
            required
          />
        </div>
        <Button type="submit" className="w-full bg-cyan-500 hover:bg-cyan-600">
          {getTranslation("sendRequest", language)}
        </Button>
      </form>
    </motion.section>
  )
}

