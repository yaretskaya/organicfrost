"use client"

import { useState, useEffect } from "react"
import { Phone, Menu, Globe } from "lucide-react"
import { motion } from "framer-motion"
import Link from "next/link"
import { useRouter, usePathname } from "next/navigation"
import { smoothScroll } from "@/utils/smoothScroll"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useLanguage } from "@/contexts/LanguageContext"
import { getTranslation } from "@/utils/translations"
import { languages } from "@/config/languages"
import { CustomDropdownMenu } from "./CustomDropdownMenu"

export default function ClientHeader() {
  const [isScrolled, setIsScrolled] = useState(false)
  const router = useRouter()
  const pathname = usePathname()
  const { language, setLanguage } = useLanguage()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = async (sectionId: string) => {
    if (pathname !== "/") {
      await router.push("/")
    }
    smoothScroll(sectionId)
  }

  const navItems = [
    { name: getTranslation("products", language), action: () => scrollToSection("product-categories") },
    { name: getTranslation("faq", language), href: "/faq" },
    { name: getTranslation("delivery", language), href: "/delivery" },
  ]

  return (
    <motion.header
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg fixed w-full z-[49] transition-all duration-300 ${
        isScrolled ? "py-2" : "py-4"
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold hover:text-cyan-200 transition">
          ORGANIC FROST
        </Link>
        <nav className="hidden md:flex justify-center flex-grow">
          <ul className="flex space-x-6">
            {navItems.map((item, index) => (
              <li key={index}>
                {item.href ? (
                  <Link href={item.href} className="hover:text-cyan-200 transition cursor-pointer">
                    {item.name}
                  </Link>
                ) : (
                  <button onClick={item.action} className="hover:text-cyan-200 transition cursor-pointer">
                    {item.name}
                  </button>
                )}
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex space-x-4 items-center">
          <button
            onClick={() => scrollToSection("quote-form")}
            className="flex items-center space-x-2 text-white hover:text-cyan-200 transition"
          >
            <Phone size={20} />
            <span className="hidden md:inline">{getTranslation("requestPrices", language)}</span>
          </button>
          <CustomDropdownMenu
            trigger={
              <Button variant="outline" size="icon" className="bg-transparent border-white hover:bg-white/20">
                <Globe className="h-4 w-4 text-white" />
              </Button>
            }
            items={languages.map((lang) => ({
              label: lang.name,
              onClick: () => setLanguage(lang.code),
            }))}
          />
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden bg-transparent border-white hover:bg-white/20">
                <Menu className="h-6 w-6 text-white" />
                <span className="sr-only">Відкрити меню</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <nav className="flex flex-col gap-4">
                {navItems.map((item, index) => (
                  <div key={index}>
                    {item.href ? (
                      <Link href={item.href} className="text-lg font-semibold hover:text-cyan-500 transition">
                        {item.name}
                      </Link>
                    ) : (
                      <button
                        onClick={item.action}
                        className="text-lg font-semibold hover:text-cyan-500 transition cursor-pointer"
                      >
                        {item.name}
                      </button>
                    )}
                  </div>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </motion.header>
  )
}

