"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import type { PortfolioImage } from "@/data/portfolios"
import { PortfolioImageViewer } from "./PortfolioImageViewer"

interface PortfolioGalleryProps {
  images: PortfolioImage[]
  category: string
}

export const PortfolioGallery = ({ images, category }: PortfolioGalleryProps) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
  const [isViewerOpen, setIsViewerOpen] = useState(false)

  if (images.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-gray-600">Belum ada foto portfolio untuk kategori ini</p>
      </div>
    )
  }

  const handleImageClick = (index: number) => {
    setSelectedIndex(index)
    setIsViewerOpen(true)
  }

  const handleClose = () => {
    setIsViewerOpen(false)
  }

  const handleNext = () => {
    if (selectedIndex !== null) {
      setSelectedIndex((selectedIndex + 1) % images.length)
    }
  }

  const handlePrevious = () => {
    if (selectedIndex !== null) {
      setSelectedIndex((selectedIndex - 1 + images.length) % images.length)
    }
  }

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {images.map((image, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            className="relative aspect-square rounded-lg overflow-hidden group cursor-pointer"
            onClick={() => handleImageClick(index)}
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

      {/* Image Viewer Modal */}
      {selectedIndex !== null && (
        <PortfolioImageViewer
          images={images}
          currentIndex={selectedIndex}
          isOpen={isViewerOpen}
          onClose={handleClose}
          onNext={handleNext}
          onPrevious={handlePrevious}
        />
      )}
    </>
  )
}

