"use client"

import { motion } from "framer-motion"
import { Home, Check, ArrowRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

interface HouseDesign {
  id: string
  name: string
  slug: string
  description: string
  size: number
  bedrooms: number
  bathrooms: number
  features: string[] | null
  images: string[] | null
  basePrice: number
}

interface HouseDesignPackagesProps {
  designs: HouseDesign[]
  onSelect?: (designId: string) => void
}

export const HouseDesignPackages = ({ designs, onSelect }: HouseDesignPackagesProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {designs.map((design, index) => {
        const primaryImage = Array.isArray(design.images) && design.images.length > 0
          ? design.images[0]
          : '/placeholder.jpg'
        const features = Array.isArray(design.features) ? design.features : []

        return (
          <motion.div
            key={design.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-xl transition-all"
          >
            <div className="relative h-48 w-full">
              <Image
                src={primaryImage}
                alt={design.name}
                fill
                className="object-cover"
              />
            </div>

            <div className="p-6">
              <div className="flex items-center gap-2 mb-2">
                <Home className="text-primary" size={20} />
                <h3 className="text-xl font-bold text-gray-900">{design.name}</h3>
              </div>

              <p className="text-gray-600 text-sm mb-4">{design.description}</p>

              <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                <span>{design.size} m²</span>
                <span>•</span>
                <span>{design.bedrooms} Kamar</span>
                <span>•</span>
                <span>{design.bathrooms} Kamar Mandi</span>
              </div>

              {features.length > 0 && (
                <div className="mb-4">
                  <ul className="space-y-2">
                    {features.slice(0, 3).map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-sm text-gray-700">
                        <Check className="text-green-500" size={16} />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="border-t border-gray-200 pt-4">
                <p className="text-2xl font-bold text-primary mb-4">
                  Rp {design.basePrice.toLocaleString('id-ID')}
                </p>

                {onSelect ? (
                  <button
                    onClick={() => onSelect(design.id)}
                    className="w-full bg-primary text-primary-foreground py-2 rounded-lg font-semibold hover:bg-primary/90 transition-all flex items-center justify-center gap-2"
                  >
                    Pilih Desain
                    <ArrowRight size={16} />
                  </button>
                ) : (
                  <Link
                    href={`/ready-to-build?design=${design.id}`}
                    className="block w-full bg-primary text-primary-foreground py-2 rounded-lg font-semibold hover:bg-primary/90 transition-all text-center flex items-center justify-center gap-2"
                  >
                    Lihat Detail
                    <ArrowRight size={16} />
                  </Link>
                )}
              </div>
            </div>
          </motion.div>
        )
      })}
    </div>
  )
}

