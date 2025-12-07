"use client"
import { motion } from "framer-motion"
import { Search } from "lucide-react"
import { useState } from "react"

export const ArticleHero = () => {
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <section className="w-full pt-32 pb-16 bg-background border-b border-border">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h1
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight"
            style={{ fontFamily: "Figtree" }}
          >
            Artikel & Insights
          </h1>
          <p className="text-lg md:text-xl text-foreground/70 max-w-3xl mx-auto mb-8" style={{ fontFamily: "Figtree" }}>
            Panduan, tips, dan insights terkini seputar industri konstruksi dan teknologi digitalisasi
          </p>

          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-foreground/50" />
            <input
              type="text"
              placeholder="Cari artikel..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-6 py-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-primary transition-colors"
              style={{ fontFamily: "Figtree" }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
