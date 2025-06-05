import fs from "fs/promises"
import path from "path"

export interface ProductPrices {
  uah: number
  usd: number
  eur: number
  pln: number
}

export interface Product {
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

export interface ProductData {
  [category: string]: Product[]
}

const dataDir = path.join(process.cwd(), "data")
const dataFilePath = path.join(dataDir, "products.json")

const initialProducts: ProductData = {
  berries: [
    {
      id: 1,
      name: { uk: "Полуниця", en: "Strawberry", de: "Erdbeere", pl: "Truskawka" },
      prices: { uah: 120, usd: 3.2, eur: 2.9, pln: 13.5 },
      category: "berries",
    },
    {
      id: 2,
      name: { uk: "Малина", en: "Raspberry", de: "Himbeere", pl: "Malina" },
      prices: { uah: 160, usd: 4.3, eur: 3.9, pln: 18 },
      category: "berries",
    },
    {
      id: 3,
      name: { uk: "Чорниця", en: "Blueberry", de: "Blaubeere", pl: "Borówka" },
      prices: { uah: 180, usd: 4.8, eur: 4.4, pln: 20.5 },
      category: "berries",
    },
    {
      id: 4,
      name: { uk: "Лохина", en: "Bilberry", de: "Heidelbeere", pl: "Jagoda" },
      prices: { uah: 200, usd: 5.4, eur: 4.9, pln: 22.5 },
      category: "berries",
    },
    {
      id: 5,
      name: { uk: "Ожина", en: "Blackberry", de: "Brombeere", pl: "Jeżyna" },
      prices: { uah: 150, usd: 4.0, eur: 3.6, pln: 17 },
      category: "berries",
    },
    {
      id: 6,
      name: { uk: "Смородина", en: "Currant", de: "Johannisbeere", pl: "Porzeczka" },
      prices: { uah: 110, usd: 3.0, eur: 2.7, pln: 12.5 },
      category: "berries",
    },
  ],
  fruits: [
    {
      id: 7,
      name: { uk: "Яблуко", en: "Apple", de: "Apfel", pl: "Jabłko" },
      prices: { uah: 45, usd: 1.2, eur: 1.1, pln: 5 },
      category: "fruits",
    },
    {
      id: 8,
      name: { uk: "Груша", en: "Pear", de: "Birne", pl: "Gruszka" },
      prices: { uah: 60, usd: 1.6, eur: 1.4, pln: 6.5 },
      category: "fruits",
    },
    {
      id: 9,
      name: { uk: "Персик", en: "Peach", de: "Pfirsich", pl: "Brzoskwinia" },
      prices: { uah: 80, usd: 2.1, eur: 1.9, pln: 9 },
      category: "fruits",
    },
    {
      id: 10,
      name: { uk: "Абрикос", en: "Apricot", de: "Aprikose", pl: "Morela" },
      prices: { uah: 90, usd: 2.4, eur: 2.2, pln: 10 },
      category: "fruits",
    },
    {
      id: 11,
      name: { uk: "Слива", en: "Plum", de: "Pflaume", pl: "Śliwka" },
      prices: { uah: 70, usd: 1.9, eur: 1.7, pln: 8 },
      category: "fruits",
    },
  ],
  vegetables: [
    {
      id: 12,
      name: { uk: "Морква", en: "Carrot", de: "Karotte", pl: "Marchew" },
      prices: { uah: 35, usd: 0.9, eur: 0.8, pln: 4 },
      category: "vegetables",
    },
    {
      id: 13,
      name: { uk: "Броколі", en: "Broccoli", de: "Brokkoli", pl: "Brokuły" },
      prices: { uah: 50, usd: 1.3, eur: 1.2, pln: 5.5 },
      category: "vegetables",
    },
    {
      id: 14,
      name: { uk: "Картопля", en: "Potato", de: "Kartoffel", pl: "Ziemniak" },
      prices: { uah: 25, usd: 0.7, eur: 0.6, pln: 3 },
      category: "vegetables",
    },
    {
      id: 15,
      name: { uk: "Цвітна капуста", en: "Cauliflower", de: "Blumenkohl", pl: "Kalafior" },
      prices: { uah: 40, usd: 1.1, eur: 1.0, pln: 4.5 },
      category: "vegetables",
    },
    {
      id: 16,
      name: { uk: "Перець", en: "Bell Pepper", de: "Paprika", pl: "Papryka" },
      prices: { uah: 65, usd: 1.7, eur: 1.5, pln: 7 },
      category: "vegetables",
    },
    {
      id: 17,
      name: { uk: "Кабачок", en: "Zucchini", de: "Zucchini", pl: "Cukinia" },
      prices: { uah: 45, usd: 1.2, eur: 1.1, pln: 5 },
      category: "vegetables",
    },
  ],
}

async function ensureDataFileExists(): Promise<void> {
  try {
    await fs.access(dataFilePath)
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") {
      try {
        await fs.mkdir(dataDir, { recursive: true })
        await fs.writeFile(dataFilePath, JSON.stringify(initialProducts, null, 2))
      } catch (writeError) {
        console.error("Error creating initial products file:", writeError)
      }
    } else {
      console.error("Error checking products file:", error)
    }
  }
}

async function readProductsFromFile(): Promise<ProductData> {
  await ensureDataFileExists()
  try {
    const data = await fs.readFile(dataFilePath, "utf-8")
    return JSON.parse(data)
  } catch (error) {
    console.error("Error reading products file:", error)
    return initialProducts
  }
}

async function writeProductsToFile(products: ProductData): Promise<void> {
  try {
    await fs.writeFile(dataFilePath, JSON.stringify(products, null, 2), "utf-8")
  } catch (error) {
    console.error("Error writing products file:", error)
  }
}

export async function getProducts(): Promise<ProductData> {
  return await readProductsFromFile()
}

export async function addProduct(product: Omit<Product, "id">): Promise<Product> {
  const products = await readProductsFromFile()
  const category = product.category as keyof ProductData
  const newId = Math.max(...products[category].map((p) => p.id), 0) + 1
  const newProduct = { ...product, id: newId } as Product
  products[category].push(newProduct)
  await writeProductsToFile(products)
  return newProduct
}

export async function updateProduct(updatedProduct: Product): Promise<Product | null> {
  const products = await readProductsFromFile()
  const category = updatedProduct.category as keyof ProductData
  const index = products[category].findIndex((p) => p.id === updatedProduct.id)
  if (index !== -1) {
    products[category][index] = updatedProduct
    await writeProductsToFile(products)
    return updatedProduct
  }
  return null
}

export async function deleteProduct(id: number, category: string): Promise<boolean> {
  const products = await readProductsFromFile()
  const categoryProducts = products[category as keyof ProductData]
  const index = categoryProducts.findIndex((p) => p.id === id)
  if (index !== -1) {
    categoryProducts.splice(index, 1)
    await writeProductsToFile(products)
    return true
  }
  return false
}

