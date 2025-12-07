"use client"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"

type ProductTeaserCardProps = {
  dailyVolume?: string
  dailyVolumeLabel?: string
  headline?: string
  subheadline?: string
  description?: string
  videoSrc?: string
  posterSrc?: string
  primaryButtonText?: string
  primaryButtonHref?: string
  secondaryButtonText?: string
  secondaryButtonHref?: string
  title?: string
  services?: Array<{
    name: string
    desc: string
    icon: string
    delay: number
  }>
}

// @component: ProductTeaserCard
export const ProductTeaserCard = (props: ProductTeaserCardProps) => {
  const {
    dailyVolume = "1,430,992,688",
    dailyVolumeLabel = "DAILY ANALYZED MESSAGES",
    headline = "The Intelligence Layer for Modern Communication",
    subheadline = "Auralink connects every call, chat, and meeting into a unified AI layer — delivering real-time insights, tone analysis, and team alignment across your favorite tools.",
    description = "Trusted by fast-growing teams and enterprises, Auralink powers smarter communication across 1,000+ organizations — with enterprise-grade security, multilingual analysis, and instant emotional detection.",
    videoSrc = "https://cdn.sanity.io/files/1t8iva7t/production/a2cbbed7c998cf93e7ecb6dae75bab42b13139c2.mp4",
    posterSrc = "/images/design-mode/9ad78a5534a46e77bafe116ce1c38172c60dc21a-1069x1068.png",
    primaryButtonText = "Start analyzing",
    primaryButtonHref = "",
    secondaryButtonText = "View API Docs",
    secondaryButtonHref = "",
    title = "Layanan Unggulan Kami",
    services = [
      {
        name: "Construction Drawing Services & Cost",
        desc: "Gambar konstruksi detail, drawing estimasi biaya, MEP drawings, dokumentasi proyek lengkap",
        icon: "📐",
        delay: 0,
      },
      {
        name: "Structural Design & Analysis",
        desc: "Analisis struktur, kalkulasi beban, analisis seismic, desain fondasi, spesifikasi material",
        icon: "🏗️",
        delay: 0.1,
      },
      {
        name: "Modeling Services",
        desc: "3D modeling profesional, visualisasi produk, simulasi metode kerja, video animasi, VR walkthrough",
        icon: "🎨",
        delay: 0.2,
      },
    ],
  } = props

  return (
    <section className="w-full px-8 py-16 bg-background">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h2
            className="text-4xl md:text-5xl font-bold text-foreground mb-4"
            style={{ fontFamily: "Figtree", fontWeight: "700" }}
          >
            {title}
          </h2>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto" style={{ fontFamily: "Figtree" }}>
            {description}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: service.delay }}
              className="bg-white border border-gray-200 rounded-2xl p-8 hover:shadow-lg transition-shadow duration-300"
            >
              <div className="text-4xl mb-4">{service.icon}</div>
              <h3
                className="text-xl font-bold text-foreground mb-3"
                style={{ fontFamily: "Figtree", fontWeight: "700" }}
              >
                {service.name}
              </h3>
              <p className="text-foreground/70 mb-6 text-sm leading-relaxed" style={{ fontFamily: "Figtree" }}>
                {service.desc}
              </p>
              <button className="text-primary font-semibold flex items-center gap-2 hover:gap-3 transition-all duration-200 group text-sm">
                <span>Request Consultation</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
