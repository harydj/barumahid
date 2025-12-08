"use client"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Cable as Cube, PenTool, Calculator } from "lucide-react"

type Service = {
  id: string
  name: string
  description: string
  icon?: string | null
  features?: any
  slug: string
}

const iconMap: Record<string, any> = {
  'PenTool': PenTool,
  'Cube': Cube,
  'Calculator': Calculator,
}

export const ServiceShowcase = () => {
  const [services, setServices] = useState<Service[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchServices() {
      try {
        const res = await fetch('/api/content/services')
        const data = await res.json()
        if (Array.isArray(data)) {
          setServices(data)
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
    <section className="w-full py-20 bg-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6" style={{ fontFamily: "Figtree" }}>
            Layanan Unggulan Kami
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {isLoading ? (
            <div className="col-span-2 text-center text-gray-500 py-8">Loading services...</div>
          ) : services.length > 0 ? (
            services.map((service, index) => {
              const Icon = service.icon ? iconMap[service.icon] || Cube : Cube
              return (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white border border-gray-200 rounded-xl p-8 hover:shadow-lg transition-all duration-300"
                >
                  <Icon className="w-12 h-12 text-primary mb-4" />
                  <h3 className="text-2xl font-bold text-foreground mb-3" style={{ fontFamily: "Figtree" }}>
                    {service.name}
                  </h3>
                  <p className="text-foreground/70 mb-6" style={{ fontFamily: "Figtree" }}>
                    {service.description}
                  </p>
                  {Array.isArray(service.features) && service.features.length > 0 && (
                    <ul className="space-y-2">
                      {service.features.map((feature: string, idx: number) => (
                        <li key={idx} className="flex items-start gap-3">
                          <span className="text-primary font-bold mt-1">✓</span>
                          <span className="text-foreground/70" style={{ fontFamily: "Figtree" }}>
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>
                  )}
                </motion.div>
              )
            })
          ) : (
            <div className="col-span-2 text-center text-gray-500 py-8">No services available</div>
          )}
        </div>
      </div>
    </section>
  )
}
