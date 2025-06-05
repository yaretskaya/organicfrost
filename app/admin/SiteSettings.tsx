"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "react-hot-toast"

interface SiteSettings {
  companyName: string
  phone: string
  email: string
  address: string
  telegramBotToken: string
  telegramChatId: string
}

export default function SiteSettings() {
  const [settings, setSettings] = useState<SiteSettings>({
    companyName: "",
    phone: "",
    email: "",
    address: "",
    telegramBotToken: "",
    telegramChatId: "",
  })

  useEffect(() => {
    fetchSettings()
  }, [])

  const fetchSettings = async () => {
    try {
      const response = await fetch("/api/site-settings")
      if (response.ok) {
        const data = await response.json()
        setSettings(data)
      }
    } catch (error) {
      console.error("Не вдалося завантажити налаштування сайту:", error)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setSettings((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetch("/api/site-settings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(settings),
      })
      if (response.ok) {
        toast.success("Налаштування сайту успішно оновлено")
      } else {
        throw new Error("Не вдалося оновити налаштування сайту")
      }
    } catch (error) {
      console.error("Помилка при оновленні налаштувань сайту:", error)
      toast.error("Не вдалося оновити налаштування сайту")
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Налаштування сайту</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="companyName">Назва компанії</Label>
            <Input id="companyName" name="companyName" value={settings.companyName} onChange={handleChange} required />
          </div>
          <div>
            <Label htmlFor="phone">Телефон</Label>
            <Input id="phone" name="phone" value={settings.phone} onChange={handleChange} required />
          </div>
          <div>
            <Label htmlFor="email">Електронна пошта</Label>
            <Input id="email" name="email" type="email" value={settings.email} onChange={handleChange} required />
          </div>
          <div>
            <Label htmlFor="address">Адреса</Label>
            <Textarea id="address" name="address" value={settings.address} onChange={handleChange} required />
          </div>
          <div>
            <Label htmlFor="telegramBotToken">Telegram Bot Token</Label>
            <Input
              id="telegramBotToken"
              name="telegramBotToken"
              value={settings.telegramBotToken}
              onChange={handleChange}
              placeholder="Введіть токен Telegram бота"
            />
          </div>
          <div>
            <Label htmlFor="telegramChatId">Telegram Chat ID</Label>
            <Input
              id="telegramChatId"
              name="telegramChatId"
              value={settings.telegramChatId}
              onChange={handleChange}
              placeholder="Введіть ID чату Telegram"
            />
          </div>
          <Button type="submit">Зберегти налаштування</Button>
        </form>
      </CardContent>
    </Card>
  )
}

