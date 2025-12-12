"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import type { PortfolioImage } from "@/data/portfolios"

interface PortfolioGalleryProps {
  images: PortfolioImage[]
  category: string
}

export const PortfolioGallery = ({ images, category }: PortfolioGalleryProps) => {
  if (images.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-gray-600">Belum ada foto portfolio untuk kategori ini</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {images.map((image, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3, delay: index * 0.05 }}
          className="relative aspect-square rounded-lg overflow-hidden group cursor-pointer"
        >
          <Image
            src={image.url}
            alt={image.alt || `${category} - ${index + 1}`}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-300"
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
          />
        </motion.div>
      ))}
    </div>
  )
}

