import { motion } from "framer-motion"

const testimonials = [
  {
    quote:
      "ORGANIC FROST поставляет нам замороженные ягоды высочайшего качества уже более 3 лет. Их продукция всегда свежая и вкусная!",
    author: "Анна Петрова",
    company: "Кондитерская 'Сладкоежка'",
  },
  {
    quote:
      "Благодаря ORGANIC FROST мы можем предлагать нашим клиентам блюда из сезонных фруктов круглый год. Отличный сервис и надежные поставки.",
    author: "Игорь Смирнов",
    company: "Ресторан 'Времена года'",
  },
  {
    quote:
      "Мы ценим ORGANIC FROST за их внимание к деталям и готовность всегда идти навстречу нашим потребностям. Настоящие профессионалы!",
    author: "Елена Иванова",
    company: "Сеть супермаркетов 'ЭкоМаркет'",
  },
]

export default function Testimonials() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Что говорят наши клиенты</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white p-6 rounded-lg shadow-md"
            >
              <p className="text-gray-600 mb-4">"{testimonial.quote}"</p>
              <p className="font-semibold">{testimonial.author}</p>
              <p className="text-sm text-gray-500">{testimonial.company}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

