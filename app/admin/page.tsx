"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import ProductForm from "./ProductForm"
import SiteSettings from "./SiteSettings"
import PasswordChange from "./PasswordChange"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Pencil, Trash2 } from "lucide-react"
import { toast } from "react-hot-toast"
import { hashPassword, verifyPassword } from "@/utils/passwordUtils"

interface Product {
  id: number
  name: {
    uk: string
    en: string
    de: string
    pl: string
  }
  prices: {
    uah: number
    usd: number
    eur: number
    pln: number
  }
  category: string
}

const categories = [
  { id: "berries", name: "Ягоди" },
  { id: "fruits", name: "Фрукти" },
  { id: "vegetables", name: "Овочі" },
]

export default function AdminPanel() {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("isAdminLoggedIn") === "true"
    }
    return false
  })
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [products, setProducts] = useState<Product[]>([])
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [activeCategory, setActiveCategory] = useState("berries")
  const [activeTab, setActiveTab] = useState("products")
  const router = useRouter()

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("isAdminLoggedIn", isLoggedIn.toString())
      // Set default admin password if not set
      const initializeDefaultPassword = async () => {
        if (!localStorage.getItem("adminPasswordHash")) {
          try {
            const hash = await hashPassword("admin123") // Default password
            localStorage.setItem("adminPasswordHash", hash)
          } catch (error) {
            console.error("Failed to set default password:", error)
          }
        }
      }
      initializeDefaultPassword()
    }

    if (isLoggedIn) {
      fetchAllProducts()
    }
  }, [isLoggedIn])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const storedHash = localStorage.getItem("adminPasswordHash")
      if (!storedHash) {
        toast.error("Помилка конфігурації: хеш пароля не знайдено")
        return
      }

      if (username !== "admin") {
        toast.error("Невірне ім'я користувача")
        return
      }

      const isValid = await verifyPassword(password, storedHash)
      if (isValid) {
        setIsLoggedIn(true)
        localStorage.setItem("isAdminLoggedIn", "true")
        toast.success("Успішний вхід")
      } else {
        toast.error("Невірний пароль")
      }
    } catch (error) {
      console.error("Login error:", error)
      toast.error("Помилка при вході")
    }
  }

  const fetchAllProducts = async () => {
    try {
      const res = await fetch("/api/products")
      if (!res.ok) throw new Error("Помилка при завантаженні продуктів")
      const data = await res.json()
      if (typeof data === "object" && data !== null) {
        const allProducts = Object.values(data).flat()
        setProducts(allProducts)
      } else {
        console.error("Unexpected data format:", data)
        toast.error("Неочікуваний формат даних продуктів")
      }
    } catch (error) {
      console.error("Error fetching products:", error)
      toast.error("Не вдалося завантажити продукти")
    }
  }

  const handleAddProduct = async (product: Omit<Product, "id">) => {
    try {
      const res = await fetch(`/api/products?category=${product.category}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Basic YWRtaW46MTIzNDU2",
        },
        body: JSON.stringify(product),
      })
      if (!res.ok) throw new Error("Помилка при додаванні продукту")
      await fetchAllProducts()
      toast.success("Продукт успішно додано")
    } catch (error) {
      console.error("Error adding product:", error)
      toast.error("Не вдалося додати продукт")
    }
  }

  const handleUpdateProduct = async (product: Product) => {
    try {
      const res = await fetch(`/api/products`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Basic YWRtaW46MTIzNDU2",
        },
        body: JSON.stringify(product),
      })
      if (!res.ok) throw new Error("Помилка при оновленні продукту")
      await fetchAllProducts()
      setEditingProduct(null)
      toast.success("Продукт успішно оновлено")
    } catch (error) {
      console.error("Error updating product:", error)
      toast.error("Не вдалося оновити продукт")
    }
  }

  const handleDeleteProduct = async (id: number, category: string) => {
    try {
      const res = await fetch(`/api/products`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Basic YWRtaW46MTIzNDU2",
        },
        body: JSON.stringify({ id, category }),
      })
      if (!res.ok) throw new Error("Помилка при видаленні продукту")
      await fetchAllProducts()
      toast.success("Продукт успішно видалено")
    } catch (error) {
      console.error("Error deleting product:", error)
      toast.error("Не вдалося видалити продукт")
    }
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    localStorage.removeItem("isAdminLoggedIn")
    router.push("/")
  }

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <Card className="w-[350px]">
          <CardHeader>
            <CardTitle>Вхід до адмін-панелі</CardTitle>
            <CardDescription>Введіть свої облікові дані для входу</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin}>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="username">Ім'я користувача</Label>
                  <Input id="username" value={username} onChange={(e) => setUsername(e.target.value)} />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="password">Пароль</Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="current-password"
                    required
                  />
                </div>
                <Button type="submit">Увійти</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Панель адміністратора</h1>
      <div className="flex gap-2 mb-6">
        <Button onClick={() => router.push("/")}>Повернутися на головну</Button>
        <Button onClick={handleLogout}>Вийти</Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-4">
          <TabsTrigger value="products">Продукти</TabsTrigger>
          <TabsTrigger value="settings">Налаштування сайту</TabsTrigger>
          <TabsTrigger value="security">Безпека</TabsTrigger>
        </TabsList>

        <TabsContent value="products">
          <Tabs defaultValue="berries" onValueChange={(value) => setActiveCategory(value)}>
            <TabsList className="mb-4">
              {categories.map((category) => (
                <TabsTrigger key={category.id} value={category.id}>
                  {category.name}
                </TabsTrigger>
              ))}
            </TabsList>
            {categories.map((category) => (
              <TabsContent key={category.id} value={category.id}>
                <Card>
                  <CardHeader>
                    <CardTitle>{category.name}</CardTitle>
                    <CardDescription>Управління товарами в категорії {category.name.toLowerCase()}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ProductForm
                      onSubmit={editingProduct ? handleUpdateProduct : handleAddProduct}
                      initialProduct={editingProduct}
                      category={category.id}
                    />
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Назва (UK)</TableHead>
                          <TableHead>Name (EN)</TableHead>
                          <TableHead>Name (DE)</TableHead>
                          <TableHead>Nazwa (PL)</TableHead>
                          <TableHead>UAH</TableHead>
                          <TableHead>USD</TableHead>
                          <TableHead>EUR</TableHead>
                          <TableHead>PLN</TableHead>
                          <TableHead>Дії</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {products
                          .filter((p) => p.category === category.id)
                          .map((product) => (
                            <TableRow key={product.id}>
                              <TableCell>{product.name.uk}</TableCell>
                              <TableCell>{product.name.en}</TableCell>
                              <TableCell>{product.name.de}</TableCell>
                              <TableCell>{product.name.pl}</TableCell>
                              <TableCell>{product.prices?.uah.toFixed(2) ?? "0.00"}</TableCell>
                              <TableCell>{product.prices?.usd.toFixed(2) ?? "0.00"}</TableCell>
                              <TableCell>{product.prices?.eur.toFixed(2) ?? "0.00"}</TableCell>
                              <TableCell>{product.prices?.pln.toFixed(2) ?? "0.00"}</TableCell>
                              <TableCell>
                                <Button
                                  variant="outline"
                                  size="icon"
                                  className="mr-2"
                                  onClick={() => setEditingProduct(product)}
                                >
                                  <Pencil className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="outline"
                                  size="icon"
                                  onClick={() => handleDeleteProduct(product.id, product.category)}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>
            ))}
          </Tabs>
        </TabsContent>

        <TabsContent value="settings">
          <SiteSettings />
        </TabsContent>

        <TabsContent value="security">
          <div className="grid gap-6">
            <PasswordChange />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

