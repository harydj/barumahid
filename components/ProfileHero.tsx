"use client"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"

export const ProfileHero = () => {
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
            Tentang <span className="text-primary">barumahID</span>
          </h1>
          <p className="text-lg md:text-xl text-foreground/70 max-w-2xl mx-auto mb-8" style={{ fontFamily: "Figtree" }}>
            Platform digitalisasi konstruksi yang menghadirkan solusi inovatif untuk kebutuhan desain, gambar teknik,
            dan pemodelan 3D proyek Anda.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors"
            style={{ fontFamily: "Figtree" }}
          >
            Hubungi Kami <ArrowRight className="w-5 h-5" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}
