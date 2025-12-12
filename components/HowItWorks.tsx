"use client"

import { motion } from "framer-motion"
import { UserPlus, Search, Wallet, CheckCircle, Home, FileCheck } from "lucide-react"

const steps = [
  {
    number: 1,
    title: "Registrasi",
    description: "Buat akun dan verifikasi identitas Anda untuk memulai program rent-to-own",
    icon: UserPlus,
    color: "from-blue-500 to-blue-600",
  },
  {
    number: 2,
    title: "Cari Kos Mitra",
    description: "Pilih kos yang bergabung dalam program rent-to-own BarumahID",
    icon: Search,
    color: "from-green-500 to-green-600",
  },
  {
    number: 3,
    title: "Bayar Sewa → Dapat Saldo Rumah",
    description: "Sebagian biaya sewa otomatis menjadi saldo kepemilikan rumah",
    icon: Wallet,
    color: "from-yellow-500 to-yellow-600",
  },
  {
    number: 4,
    title: "Penuhi Syarat",
    description: "Ketika saldo & riwayat pembayaran memenuhi ketentuan, kamu naik ke status Siap Konstruksi",
    icon: CheckCircle,
    color: "from-purple-500 to-purple-600",
  },
  {
    number: 5,
    title: "Pilih Desain & Bangun Rumah",
    description: "BarumahID dan partner konstruksi membangun rumah berdasarkan saldo kamu",
    icon: Home,
    color: "from-orange-500 to-orange-600",
  },
  {
    number: 6,
    title: "Valuasi BTN & Kontrak",
    description: "BTN menilai harga rumah yang selesai dibangun, lalu kamu menandatangani kontrak langsung dengan BTN",
    icon: FileCheck,
    color: "from-red-500 to-red-600",
  },
]

export const HowItWorks = () => {
  return (
    <section className="w-full py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Bagaimana BarumahID Bekerja
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Dari ngekos hingga punya rumah dalam 6 langkah sederhana
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {steps.map((step, index) => {
            const Icon = step.icon
            return (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative"
              >
                <div className="bg-white rounded-2xl p-8 border border-gray-200 hover:shadow-xl transition-all h-full">
                  {/* Step number badge */}
                  <div className="absolute -top-4 -left-4 w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-lg shadow-lg">
                    {step.number}
                  </div>

                  {/* Icon */}
                  <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${step.color} flex items-center justify-center mb-6 shadow-lg`}>
                    <Icon size={32} className="text-white" />
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {/* Connector line (except for last item) */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gray-300 transform -translate-y-1/2">
                    <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-0 h-0 border-l-8 border-l-gray-300 border-t-4 border-t-transparent border-b-4 border-b-transparent"></div>
                  </div>
                )}
              </motion.div>
            )
          })}
        </div>

        {/* Mobile: Vertical connector */}
        <div className="lg:hidden mt-8 flex justify-center">
          <div className="flex flex-col items-center gap-4">
            {steps.slice(0, -1).map((_, index) => (
              <div key={index} className="w-0.5 h-8 bg-gray-300"></div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}


