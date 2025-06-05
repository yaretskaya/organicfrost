"use client"

import { useRouter } from "next/navigation"

export function useNavigation() {
  const router = useRouter()

  const scrollToElement = (elementId: string) => {
    const element = document.getElementById(elementId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" })
    } else {
      router.push("/#" + elementId)
    }
  }

  return { scrollToElement }
}

