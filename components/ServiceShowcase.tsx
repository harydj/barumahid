"use client"
import { motion } from "framer-motion"
import { Cable as Cube, PenTool, Calculator } from "lucide-react"

const services = [
  {
    icon: PenTool,
    title: "Construction Drawing",
    description: "Gambar teknik konstruksi yang detail dan presisi sesuai standar internasional",
    features: [
      "Detail desain 2D yang akurat",
      "Standar SNI dan internasional",
      "Revisi unlimited",
      "Format PDF dan CAD",
    ],
  },
  {
    icon: Cube,
    title: "Structural Design",
    description: "Desain struktur yang aman, ekonomis, dan sesuai dengan kode bangunan terkini",
    features: ["Analisis struktur mendalam", "Material engineering", "Perhitungan detail beban", "Report lengkap"],
  },
  {
    icon: Cube,
    title: "3D Modeling Services",
    description: "Visualisasi proyek dalam bentuk 3D yang memukau dan interaktif",
    features: ["Model 3D berkualitas tinggi", "Rendering profesional", "Animasi walkthrough", "Virtual tour"],
  },
  {
    icon: Calculator,
    title: "Cost Estimation",
    description: "Estimasi biaya akurat dengan breakdown detail untuk setiap item pekerjaan",
    features: ["RAB komprehensif", "Analisis harga satuan", "Breakdown biaya", "Update harga real-time"],
  },
]

export const ServiceShowcase = () => {
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
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6" style={{ fontFamily: "Figtree" }}>
            Layanan Unggulan Kami
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {services.map((service, index) => {
            const Icon = service.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white border border-gray-200 rounded-xl p-8 hover:shadow-lg transition-all duration-300"
              >
                <Icon className="w-12 h-12 text-primary mb-4" />
                <h3 className="text-2xl font-bold text-foreground mb-3" style={{ fontFamily: "Figtree" }}>
                  {service.title}
                </h3>
                <p className="text-foreground/70 mb-6" style={{ fontFamily: "Figtree" }}>
                  {service.description}
                </p>
                <ul className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <span className="text-primary font-bold mt-1">✓</span>
                      <span className="text-foreground/70" style={{ fontFamily: "Figtree" }}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
