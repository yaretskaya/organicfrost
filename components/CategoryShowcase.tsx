import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"

const categories = [
  {
    name: "Культивированные ягоды",
    image: "https://images.unsplash.com/photo-1615218370629-da07db3571a4?auto=format&fit=crop&q=80",
    link: "/products/cultivated-berries",
    description: "Вишня • Смородина • Клубника • Малина",
  },
  {
    name: "Дикорослые ягоды",
    image: "https://images.unsplash.com/photo-1498557850523-fd3d118b962e?auto=format&fit=crop&q=80",
    link: "/products/wild-berries",
    description: "Черника • Ежевика • Брусника • Клюква",
  },
  {
    name: "Замороженные овощи",
    image: "https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&q=80",
    link: "/products/vegetables",
    description: "Брокколи • Цветная капуста • Морковь • Горошек",
  },
]

export default function CategoryShowcase() {
  return (
    <section className="mb-12">
      <h2 className="text-3xl font-bold mb-6 text-center">Подробнее о продукции</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {categories.map((category, index) => (
          <motion.div
            key={category.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Link href={category.link} className="group block">
              <div className="relative h-64 rounded-lg overflow-hidden">
                <Image
                  src={category.image || "/placeholder.svg"}
                  alt={category.name}
                  layout="fill"
                  objectFit="cover"
                  className="transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-6">
                  <h3 className="text-xl font-bold text-white mb-2">{category.name}</h3>
                  <p className="text-gray-200 text-sm">{category.description}</p>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

