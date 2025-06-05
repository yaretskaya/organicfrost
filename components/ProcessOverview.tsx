import { motion } from "framer-motion"
import { Search, Leaf, Package, Truck } from "lucide-react"

const steps = [
  { icon: Search, title: "Отбор поставщиков", description: "Тщательный выбор надежных фермерских хозяйств" },
  { icon: Leaf, title: "Контроль качества", description: "Проверка свежести и качества каждой партии" },
  {
    icon: Package,
    title: "Современная обработка",
    description: "Использование передовых технологий обработки и упаковки",
  },
  {
    icon: Truck,
    title: "Логистика",
    description: "Оптимизированная система доставки с соблюдением температурного режима",
  },
]

export default function ProcessOverview() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Наш процесс</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white p-6 rounded-lg shadow-md text-center"
            >
              <step.icon className="w-12 h-12 mx-auto mb-4 text-cyan-500" />
              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

