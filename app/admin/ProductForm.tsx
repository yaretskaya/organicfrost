"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"

interface ProductPrices {
  uah: number
  usd: number
  eur: number
  pln: number // Add Polish Złoty
}

interface Product {
  id: number
  name: {
    uk: string
    en: string
    de: string
    pl: string
  }
  prices: ProductPrices
  category: string
}

interface ProductFormProps {
  onSubmit: (product: Omit<Product, "id"> | Product) => void
  initialProduct: Product | null
  category: string
}

export default function ProductForm({ onSubmit, initialProduct, category }: ProductFormProps) {
  const [formData, setFormData] = useState({
    name: {
      uk: "",
      en: "",
      de: "",
      pl: "",
    },
    prices: {
      uah: 0,
      usd: 0,
      eur: 0,
      pln: 0, // Add Polish Złoty
    },
    category: category,
  })

  useEffect(() => {
    if (initialProduct) {
      setFormData({
        name: initialProduct.name,
        prices: initialProduct.prices,
        category: initialProduct.category,
      })
    } else {
      setFormData({
        name: { uk: "", en: "", de: "", pl: "" },
        prices: { uah: 0, usd: 0, eur: 0, pln: 0 }, // Add Polish Złoty
        category: category,
      })
    }
  }, [initialProduct, category])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (initialProduct) {
      onSubmit({ ...initialProduct, ...formData })
    } else {
      onSubmit(formData)
    }
    setFormData({
      name: { uk: "", en: "", de: "", pl: "" },
      prices: { uah: 0, usd: 0, eur: 0, pln: 0 }, // Add Polish Złoty
      category: category,
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 mb-6">
      <Card className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <Label htmlFor="name-uk">Назва українською</Label>
            <Input
              id="name-uk"
              value={formData.name.uk}
              onChange={(e) => setFormData((prev) => ({ ...prev, name: { ...prev.name, uk: e.target.value } }))}
              className="w-full"
              required
              placeholder="Введіть назву українською"
            />
          </div>
          <div>
            <Label htmlFor="name-en">Назва англійською</Label>
            <Input
              id="name-en"
              value={formData.name.en}
              onChange={(e) => setFormData((prev) => ({ ...prev, name: { ...prev.name, en: e.target.value } }))}
              className="w-full"
              required
              placeholder="Введіть назву англійською"
            />
          </div>
          <div>
            <Label htmlFor="name-de">Назва німецькою</Label>
            <Input
              id="name-de"
              value={formData.name.de}
              onChange={(e) => setFormData((prev) => ({ ...prev, name: { ...prev.name, de: e.target.value } }))}
              className="w-full"
              required
              placeholder="Введіть назву німецькою"
            />
          </div>
          <div>
            <Label htmlFor="name-pl">Назва польською</Label>
            <Input
              id="name-pl"
              value={formData.name.pl}
              onChange={(e) => setFormData((prev) => ({ ...prev, name: { ...prev.name, pl: e.target.value } }))}
              className="w-full"
              required
              placeholder="Введіть назву польською"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <Label htmlFor="price-uah">Ціна (UAH)</Label>
            <Input
              id="price-uah"
              type="number"
              step="0.01"
              value={formData.prices.uah}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  prices: { ...prev.prices, uah: Number.parseFloat(e.target.value) || 0 },
                }))
              }
              className="w-full"
              required
              placeholder="0.00"
            />
          </div>
          <div>
            <Label htmlFor="price-usd">Ціна (USD)</Label>
            <Input
              id="price-usd"
              type="number"
              step="0.01"
              value={formData.prices.usd}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  prices: { ...prev.prices, usd: Number.parseFloat(e.target.value) || 0 },
                }))
              }
              className="w-full"
              required
              placeholder="0.00"
            />
          </div>
          <div>
            <Label htmlFor="price-eur">Ціна (EUR)</Label>
            <Input
              id="price-eur"
              type="number"
              step="0.01"
              value={formData.prices.eur}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  prices: { ...prev.prices, eur: Number.parseFloat(e.target.value) || 0 },
                }))
              }
              className="w-full"
              required
              placeholder="0.00"
            />
          </div>
          <div>
            <Label htmlFor="price-pln">Ціна (PLN)</Label>
            <Input
              id="price-pln"
              type="number"
              step="0.01"
              value={formData.prices.pln}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  prices: { ...prev.prices, pln: Number.parseFloat(e.target.value) || 0 },
                }))
              }
              className="w-full"
              required
              placeholder="0.00"
            />
          </div>
        </div>
      </Card>
      <Button type="submit">{initialProduct ? "Оновити продукт" : "Додати продукт"}</Button>
    </form>
  )
}

