"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { motion } from "framer-motion"

export default function Newsletter() {
  const [email, setEmail] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Здесь будет логика отправки email на сервер
    console.log("Подписка на рассылку:", email)
    setEmail("")
    alert("Спасибо за подписку!")
  }

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="bg-cyan-500 text-white py-12 rounded-xl mb-12"
    >
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-4">Подпишитесь на наши новости</h2>
        <p className="mb-6">Получайте эксклюзивные предложения и рецепты прямо на вашу почту</p>
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row justify-center gap-4">
          <Input
            type="email"
            placeholder="Ваш email"
            className="bg-white text-gray-800 max-w-sm"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Button type="submit" className="bg-blue-600 hover:bg-blue-700 transition">
            Подписаться
          </Button>
        </form>
      </div>
    </motion.section>
  )
}

