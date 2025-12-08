"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

type FeatureItem = {
  id: string
  title: string
  description: string
  icon?: string | null
  order: number
}

export const IntegrationCarousel = () => {
  const [features, setFeatures] = useState<FeatureItem[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchFeatures() {
      try {
        const res = await fetch('/api/content/features')
        const data = await res.json()
        if (Array.isArray(data)) {
          setFeatures(data)
        }
      } catch (error) {
        console.error('Error fetching features:', error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchFeatures()
  }, [])
  return (
    <div className="w-full py-24 bg-white">
      <div className="max-w-7xl mx-auto px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <h2
            className="text-4xl md:text-5xl font-bold text-foreground mb-4"
            style={{
              fontFamily: "Figtree",
              fontWeight: "700",
            }}
          >
            Mengapa Memilih barumahID?
          </h2>
          <p
            className="text-lg text-foreground/70 max-w-2xl mx-auto"
            style={{
              fontFamily: "Figtree",
            }}
          >
            Platform kami didukung oleh tim profesional berpengalaman dan teknologi terdepan
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {isLoading ? (
            <div className="col-span-2 text-center text-gray-500">Loading features...</div>
          ) : features.length > 0 ? (
            features.map((feature, index) => (
            <motion.div
                key={feature.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white border border-gray-200 rounded-xl p-8 hover:shadow-md transition-shadow duration-300"
            >
                <div className="text-5xl mb-4">{feature.icon || "⭐"}</div>
              <h3
                className="text-xl font-bold text-foreground mb-3"
                style={{ fontFamily: "Figtree", fontWeight: "700" }}
              >
                {feature.title}
              </h3>
              <p className="text-foreground/70 leading-relaxed" style={{ fontFamily: "Figtree" }}>
                {feature.description}
              </p>
            </motion.div>
          ))
          ) : (
            <div className="col-span-2 text-center text-gray-500">No features available</div>
          )}
        </div>
      </div>
    </div>
  )
}
