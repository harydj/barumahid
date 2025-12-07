"use client"
import { motion } from "framer-motion"
import { FileText, MessageSquare, Zap, CheckCircle } from "lucide-react"

const steps = [
  {
    number: 1,
    icon: MessageSquare,
    title: "Konsultasi Awal",
    description: "Diskusi kebutuhan proyek Anda secara detail untuk memahami requirement lengkap",
  },
  {
    number: 2,
    icon: FileText,
    title: "Survey & Analisis",
    description: "Pengumpulan data dan analisis kondisi lapangan untuk solusi terbaik",
  },
  {
    number: 3,
    icon: Zap,
    title: "Eksekusi Desain",
    description: "Pembuatan desain dengan teknologi terkini dan quality control ketat",
  },
  {
    number: 4,
    icon: CheckCircle,
    title: "Revisi & Finalisasi",
    description: "Review bersama klien dan penyempurnaan hingga mencapai kepuasan maksimal",
  },
]

export const ServiceProcess = () => {
  return (
    <section className="w-full py-20 bg-background border-y border-border">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold text-foreground mb-16 text-center"
          style={{ fontFamily: "Figtree" }}
        >
          Proses Kerja Kami
        </motion.h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => {
            const Icon = step.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative"
              >
                <div className="bg-white border border-gray-200 rounded-xl p-6 h-full">
                  <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold mb-4">
                    {step.number}
                  </div>
                  <Icon className="w-8 h-8 text-primary mb-4" />
                  <h3 className="text-lg font-bold text-foreground mb-2" style={{ fontFamily: "Figtree" }}>
                    {step.title}
                  </h3>
                  <p className="text-sm text-foreground/70" style={{ fontFamily: "Figtree" }}>
                    {step.description}
                  </p>
                </div>
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-0.5 bg-primary/30 transform -translate-y-1/2" />
                )}
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
