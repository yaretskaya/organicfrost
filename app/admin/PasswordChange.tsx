"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "react-hot-toast"
import { hashPassword, verifyPassword } from "@/utils/passwordUtils"

export default function PasswordChange() {
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const storedHash = localStorage.getItem("adminPasswordHash")
      if (!storedHash) {
        toast.error("Помилка: хеш пароля не знайдено")
        return
      }

      // Verify current password
      const isValid = await verifyPassword(currentPassword, storedHash)
      if (!isValid) {
        toast.error("Поточний пароль невірний")
        return
      }

      // Validate new password
      if (newPassword.length < 8) {
        toast.error("Новий пароль повинен містити щонайменше 8 символів")
        return
      }

      // Check if passwords match
      if (newPassword !== confirmPassword) {
        toast.error("Паролі не співпадають")
        return
      }

      // Hash and save new password
      const newHash = await hashPassword(newPassword)
      localStorage.setItem("adminPasswordHash", newHash)

      toast.success("Пароль успішно змінено")

      // Clear form
      setCurrentPassword("")
      setNewPassword("")
      setConfirmPassword("")
    } catch (error) {
      console.error("Password change error:", error)
      toast.error("Помилка при зміні пароля")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Зміна паролю</CardTitle>
        <CardDescription>Змініть пароль для входу в адмін-панель</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="currentPassword">Поточний пароль</Label>
            <Input
              id="currentPassword"
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              required
              disabled={isLoading}
              placeholder="Введіть поточний пароль"
            />
          </div>
          <div>
            <Label htmlFor="newPassword">Новий пароль</Label>
            <Input
              id="newPassword"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              disabled={isLoading}
              placeholder="Мінімум 8 символів"
            />
          </div>
          <div>
            <Label htmlFor="confirmPassword">Підтвердіть новий пароль</Label>
            <Input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              disabled={isLoading}
              placeholder="Повторіть новий пароль"
            />
          </div>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Зміна паролю..." : "Змінити пароль"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

