"use client"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"

type Service = {
  id: string
  name: string
  description: string
  icon?: string | null
  features?: any
  slug: string
}

type ProductTeaserCardProps = {
  title?: string
  description?: string
}

// @component: ProductTeaserCard
export const ProductTeaserCard = (props: ProductTeaserCardProps) => {
  const { title, description } = props
  const [services, setServices] = useState<Service[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchServices() {
      try {
        const res = await fetch('/api/content/services')
        const data = await res.json()
        if (Array.isArray(data)) {
          setServices(data.map((s: Service, index: number) => ({
            ...s,
            delay: index * 0.1,
          })))
        }
      } catch (error) {
        console.error('Error fetching services:', error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchServices()
  }, [])

  return (
    <section className="w-full px-8 py-16 bg-background">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h2
            className="text-4xl md:text-5xl font-bold text-foreground mb-4"
            style={{ fontFamily: "Figtree", fontWeight: "700" }}
          >
            {title || "Layanan Unggulan Kami"}
          </h2>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto" style={{ fontFamily: "Figtree" }}>
            {description || "Solusi lengkap untuk kebutuhan digitalisasi proyek konstruksi Anda"}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {isLoading ? (
            <div className="col-span-3 text-center text-gray-500">Loading services...</div>
          ) : services.length > 0 ? (
            services.map((service) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: service.delay || 0 }}
                className="bg-white border border-gray-200 rounded-2xl p-8 hover:shadow-lg transition-shadow duration-300"
              >
                <div className="text-4xl mb-4">{service.icon || "📐"}</div>
                <h3
                  className="text-xl font-bold text-foreground mb-3"
                  style={{ fontFamily: "Figtree", fontWeight: "700" }}
                >
                  {service.name}
                </h3>
                <p className="text-foreground/70 mb-6 text-sm leading-relaxed" style={{ fontFamily: "Figtree" }}>
                  {service.description}
                </p>
                <button className="text-primary font-semibold flex items-center gap-2 hover:gap-3 transition-all duration-200 group text-sm">
                  <span>Request Consultation</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>
              </motion.div>
            ))
          ) : (
            <div className="col-span-3 text-center text-gray-500">No services available</div>
          )}
        </div>
      </div>
    </section>
  )
}
