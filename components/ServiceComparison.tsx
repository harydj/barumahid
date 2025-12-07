"use client"
import { motion } from "framer-motion"
import { Check } from "lucide-react"

const packages = [
  {
    name: "Basic",
    price: "Rp 5jt",
    description: "Untuk proyek kecil hingga menengah",
    features: ["2D Drawing", "Basic Design", "2 Revisi", "Report Sederhana", "Support Email"],
    notIncluded: ["3D Modeling", "Rendering", "Animasi", "Priority Support"],
  },
  {
    name: "Professional",
    price: "Rp 15jt",
    description: "Untuk proyek besar dengan kebutuhan lengkap",
    features: [
      "2D Drawing Lengkap",
      "Structural Design",
      "5 Revisi",
      "Report Komprehensif",
      "Priority Support",
      "3D Modeling Basic",
      "Rendering",
    ],
    notIncluded: ["Animasi Walkthrough", "VR Tour"],
    popular: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "Solusi lengkap dengan dukungan penuh",
    features: [
      "Semua Layanan",
      "Unlimited Revisi",
      "Full 3D Modeling",
      "Animasi Profesional",
      "VR Tour",
      "Dedicated Team",
      "24/7 Support",
    ],
    notIncluded: [],
  },
]

export const ServiceComparison = () => {
  return (
    <section className="w-full py-20 bg-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4" style={{ fontFamily: "Figtree" }}>
            Paket Layanan
          </h2>
          <p className="text-lg text-foreground/70" style={{ fontFamily: "Figtree" }}>
            Pilih paket yang sesuai dengan kebutuhan proyek Anda
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {packages.map((pkg, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`rounded-xl p-8 h-full flex flex-col ${
                pkg.popular ? "bg-white border-2 border-primary shadow-lg relative" : "bg-white border border-gray-200"
              }`}
            >
              {pkg.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-bold">
                  POPULAR
                </div>
              )}
              <h3 className="text-2xl font-bold text-foreground mb-2" style={{ fontFamily: "Figtree" }}>
                {pkg.name}
              </h3>
              <p className="text-foreground/70 text-sm mb-4" style={{ fontFamily: "Figtree" }}>
                {pkg.description}
              </p>
              <div className="mb-6 pb-6 border-b border-gray-200">
                <p className="text-3xl font-bold text-primary" style={{ fontFamily: "Figtree" }}>
                  {pkg.price}
                </p>
              </div>
              <ul className="space-y-3 flex-grow mb-6">
                {pkg.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-primary flex-shrink-0" />
                    <span className="text-foreground/80 text-sm" style={{ fontFamily: "Figtree" }}>
                      {feature}
                    </span>
                  </li>
                ))}
                {pkg.notIncluded.map((feature, idx) => (
                  <li key={`not-${idx}`} className="flex items-center gap-3 opacity-50">
                    <div className="w-5 h-5 flex-shrink-0" />
                    <span className="text-foreground/50 text-sm line-through" style={{ fontFamily: "Figtree" }}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
              <button
                className={`w-full py-3 rounded-lg font-semibold transition-all duration-200 ${
                  pkg.popular
                    ? "bg-primary text-primary-foreground hover:bg-primary/90"
                    : "bg-muted text-foreground hover:bg-muted/80"
                }`}
                style={{ fontFamily: "Figtree" }}
              >
                Pilih Paket
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
