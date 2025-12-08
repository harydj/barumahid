"use client"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Check } from "lucide-react"

type PricingPackage = {
  id: string
  name: string
  description?: string | null
  priceMonthly?: number | null
  priceYearly?: number | null
  popular: boolean
  features?: any
  order: number
}

export function PricingSection() {
  const [packages, setPackages] = useState<PricingPackage[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchPricing() {
      try {
        const res = await fetch('/api/content/pricing')
        const data = await res.json()
        if (Array.isArray(data)) {
          setPackages(data.map((pkg: PricingPackage, index: number) => ({
            ...pkg,
            delay: index * 0.1,
          })))
        }
      } catch (error) {
        console.error('Error fetching pricing packages:', error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchPricing()
  }, [])

  return (
    <section className="py-24 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-figtree text-5xl font-bold leading-tight mb-4">Paket Layanan Kami</h2>
          <p className="font-figtree text-lg text-muted-foreground max-w-2xl mx-auto">
            Pilih paket yang sesuai dengan kebutuhan proyek konstruksi Anda
          </p>
        </motion.div>

        {/* Billing Toggle */}
        {/* Removed billing toggle as it's not relevant to the new package structure */}

        {/* Plan Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {isLoading ? (
            <div className="col-span-3 text-center text-gray-500">Loading pricing packages...</div>
          ) : packages.length > 0 ? (
            packages.map((pkg) => (
              <motion.div
                key={pkg.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: pkg.delay || 0 }}
                className={`relative rounded-2xl p-8 transition-all duration-300 ${
                  pkg.popular
                    ? "border-2 border-primary bg-white transform md:scale-105"
                    : "border border-gray-200 bg-white"
                }`}
              >
                {pkg.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-semibold">
                    Paling Populer
                  </div>
                )}
                <h3 className="font-figtree text-2xl font-bold mb-2">{pkg.name}</h3>
                <p className="text-muted-foreground text-sm mb-6">{pkg.description || ""}</p>

                <ul className="space-y-3 mb-8">
                  {Array.isArray(pkg.features) && pkg.features.map((feature: string, i: number) => (
                    <li key={i} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-foreground text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

              <button
                className={`w-full py-3 rounded-lg font-semibold transition-all duration-200 ${
                  pkg.popular
                    ? "bg-primary text-primary-foreground hover:bg-primary/90"
                    : "border border-primary text-primary hover:bg-primary/5"
                }`}
              >
                Lihat Detail
              </button>
            </motion.div>
          ))
          ) : (
            <div className="col-span-3 text-center text-gray-500">No pricing packages available</div>
          )}
        </div>

        {/* Features Table */}
        {/* Removed features table as it's not relevant to the new package structure */}

        {/* CTA Button */}
        {/* Removed CTA button as it's not relevant to the new package structure */}
      </div>
    </section>
  )
}
