import Hero from "@/components/Hero"
import FeaturedProducts from "@/components/FeaturedProducts"
import Benefits from "@/components/Benefits"
import QuoteForm from "@/components/QuoteForm"
import CallToAction from "@/components/CallToAction"

export default function Home() {
  return (
    <div className="space-y-16">
      <Hero />
      <div className="container mx-auto px-4">
        <FeaturedProducts />
        <Benefits />
        <QuoteForm />
        <CallToAction />
      </div>
    </div>
  )
}

