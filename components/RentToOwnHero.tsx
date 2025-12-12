"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { ArrowRight, Home, Key } from "lucide-react"
import Link from "next/link"

interface HomePageData {
  heroTitle?: string
  heroSubtitle?: string
  heroDescription?: string
  stats?: Array<{ value: string; description: string }>
}

export const RentToOwnHero = () => {
  const [homePageData, setHomePageData] = useState<HomePageData | null>(null)

  useEffect(() => {
    async function fetchHomePageData() {
      try {
        const res = await fetch('/api/content/homepage', {
          cache: 'no-store',
        })
        const data = await res.json()

        if (data && !data.error) {
          setHomePageData(data)
        }
      } catch (error) {
        console.error('Error fetching homepage data:', error)
      }
    }
    fetchHomePageData()
  }, [])

  if (!homePageData) {
    return (
      <div className="w-full overflow-hidden bg-white min-h-[600px] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    )
  }

  const stats = homePageData.stats || [
    { value: '1000+', description: 'User\nTerdaftar' },
    { value: '500+', description: 'Kos Mitra\nAktif' },
    { value: '50+', description: 'Rumah\nTerselesaikan' },
    { value: '95%', description: 'Kepuasan\nUser' },
  ]

  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-br from-primary/10 via-white to-primary/5 min-h-[90vh] flex items-center">
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      
      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-20 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight"
              >
                {homePageData.heroTitle || "Dari Ngekos, Bisa Punya Rumah"}
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-xl lg:text-2xl text-primary font-semibold"
              >
                {homePageData.heroSubtitle || "Platform Rent-to-Own BarumahID"}
              </motion.p>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-lg text-gray-600 leading-relaxed max-w-xl"
              >
                {homePageData.heroDescription || "Mulai dari ngekos, akhiri dengan punya rumah. Program rent-to-own inovatif yang mengubah biaya sewa menjadi saldo kepemilikan rumah."}
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link
                href="/register"
                className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-lg font-semibold hover:bg-primary/90 transition-all shadow-lg hover:shadow-xl"
              >
                Daftar Sekarang
                <ArrowRight size={20} />
              </Link>
              
              <Link
                href="/kos"
                className="inline-flex items-center justify-center gap-2 bg-white text-primary border-2 border-primary px-8 py-4 rounded-lg font-semibold hover:bg-primary/5 transition-all"
              >
                <Home size={20} />
                Cari Kos Mitra
              </Link>
            </motion.div>
          </motion.div>

          {/* Right: Illustration/Stats */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="relative"
          >
            <div className="grid grid-cols-2 gap-6">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                  className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow"
                >
                  <div className="text-4xl font-bold text-primary mb-2">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-600 whitespace-pre-line">
                    {stat.description}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Decorative elements */}
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary/10 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-primary/5 rounded-full blur-3xl"></div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 border-2 border-gray-400 rounded-full flex items-start justify-center p-2"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1.5 h-1.5 bg-gray-400 rounded-full"
          />
        </motion.div>
      </motion.div>
    </section>
  )
}


