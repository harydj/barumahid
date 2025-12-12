"use client"

import { useState, useMemo } from "react"
import { PortfolioNavbar } from "@/components/PortfolioNavbar"
import { Footer } from "@/components/Footer"
import { PortfolioGallery } from "@/components/PortfolioGallery"
import { PortfolioFilter } from "@/components/PortfolioFilter"
import { motion } from "framer-motion"
import { getImagesByCategory } from "@/data/portfolios"

export default function PortfolioPage() {
  const [selectedCategory, setSelectedCategory] = useState("all")

  const images = useMemo(() => {
    return getImagesByCategory(selectedCategory)
  }, [selectedCategory])

  return (
    <>
      <PortfolioNavbar />
      <main className="min-h-screen bg-gray-50 pt-20 pb-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-12 text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4" style={{ fontFamily: "Figtree" }}>
              Portfolio Kami
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto" style={{ fontFamily: "Figtree" }}>
              Lihat hasil karya terbaik kami
            </p>
          </motion.div>

          {/* Filter */}
          <PortfolioFilter
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
          />

          {/* Gallery */}
          <PortfolioGallery images={images} category={selectedCategory} />
        </div>
      </main>
      <Footer />
    </>
  )
}

