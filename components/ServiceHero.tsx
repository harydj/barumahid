"use client"
import { motion } from "framer-motion"

export const ServiceHero = () => {
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
            Layanan <span className="text-primary">barumahID</span>
          </h1>
          <p className="text-lg md:text-xl text-foreground/70 max-w-3xl mx-auto" style={{ fontFamily: "Figtree" }}>
            Kami menyediakan solusi lengkap untuk kebutuhan digitalisasi proyek konstruksi Anda, mulai dari gambar
            teknik hingga pemodelan 3D profesional
          </p>
        </motion.div>
      </div>
    </section>
  )
}
