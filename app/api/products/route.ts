import { NextResponse } from "next/server"
import {
  getProducts,
  addProduct,
  updateProduct,
  deleteProduct,
  type Product,
  type ProductData,
} from "@/lib/productStorage"
import { withAuth } from "@/lib/auth"

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const category = searchParams.get("category")
  const lang = searchParams.get("lang") || "uk"

  try {
    const products: ProductData = await getProducts()

    if (category) {
      // Return products for a specific category
      return NextResponse.json(products[category] || [])
    } else {
      // Return all products
      return NextResponse.json(products)
    }
  } catch (error) {
    console.error("Error fetching products:", error)
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 })
  }
}

export const POST = withAuth(async (req: Request) => {
  const { searchParams } = new URL(req.url)
  const category = searchParams.get("category")
  if (!category) {
    return NextResponse.json({ error: "Category is required" }, { status: 400 })
  }
  const body = await req.json()
  try {
    const newProduct = await addProduct({ ...body, category })
    return NextResponse.json(newProduct)
  } catch (error) {
    console.error("Error adding product:", error)
    return NextResponse.json({ error: "Failed to add product" }, { status: 500 })
  }
})

export const PUT = withAuth(async (req: Request) => {
  const body: Product = await req.json()
  try {
    const updatedProduct = await updateProduct(body)
    if (updatedProduct) {
      return NextResponse.json(updatedProduct)
    }
    return NextResponse.json({ error: "Product not found" }, { status: 404 })
  } catch (error) {
    console.error("Error updating product:", error)
    return NextResponse.json({ error: "Failed to update product" }, { status: 500 })
  }
})

export const DELETE = withAuth(async (req: Request) => {
  const { id, category } = await req.json()
  try {
    const success = await deleteProduct(Number(id), category)
    if (success) {
      return NextResponse.json({ success: true })
    }
    return NextResponse.json({ error: "Product not found" }, { status: 404 })
  } catch (error) {
    console.error("Error deleting product:", error)
    return NextResponse.json({ error: "Failed to delete product" }, { status: 500 })
  }
})

