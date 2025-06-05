import { create } from "zustand"

interface Product {
  id: number
  name: string
  price: number
  image: string
}

interface CartState {
  cartItems: Product[]
  addToCart: (product: Product) => void
  removeFromCart: (productId: number) => void
}

export const useStore = create<CartState>((set) => ({
  cartItems: [],
  addToCart: (product) =>
    set((state) => ({
      cartItems: [...state.cartItems, product],
    })),
  removeFromCart: (productId) =>
    set((state) => ({
      cartItems: state.cartItems.filter((item) => item.id !== productId),
    })),
}))

