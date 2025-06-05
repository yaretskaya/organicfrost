import type { Metadata } from "next"
import { Montserrat } from "next/font/google"
import "./globals.css"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import PageTransition from "@/components/PageTransition"
import { LanguageProvider } from "@/contexts/LanguageContext"
import type React from "react"
import { Toaster } from "react-hot-toast"

const montserrat = Montserrat({ subsets: ["latin", "cyrillic"] })

export const metadata: Metadata = {
  title: "ORGANIC FROST",
  description: "Преміальні заморожені фрукти, ягоди та овочі",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="uk">
      <body className={montserrat.className}>
        <LanguageProvider>
          <Header />
          <PageTransition>
            <main className="min-h-screen pt-16">{children}</main>
          </PageTransition>
          <Footer />
          <Toaster position="top-center" />
        </LanguageProvider>
      </body>
    </html>
  )
}



import './globals.css'