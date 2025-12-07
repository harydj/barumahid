"use client"
import { motion } from "framer-motion"

const values = [
  {
    title: "Dukungan Konsultasi",
    description: "Layanan pelanggan responsif dan konsultasi menyeluruh dari perencanaan hingga pelaksanaan",
  },
  {
    title: "Inovasi Teknologi",
    description: "Menggunakan Lean Construction, BIM, AI/AR-VR untuk efisiensi dan akurasi maksimal",
  },
  {
    title: "Harga Kompetitif",
    description: "Layanan berkualitas dengan harga transparan dan terjangkau",
  },
  {
    title: "Keberlanjutan",
    description: "Menerapkan Green Construction untuk lingkungan dan keberlanjutan jangka panjang",
  },
]

const lbag = [
  {
    title: "Lean Construction",
    description: "Mengoptimalkan proses untuk mengurangi pemborosan dan meningkatkan efisiensi biaya proyek Anda",
  },
  {
    title: "Building Information Modeling (BIM)",
    description: "Visualisasi dan kolaborasi lebih baik, mengurangi risiko keterlambatan dengan teknologi 3D terpadu",
  },
  {
    title: "AI & AR/VR",
    description: "Pengalaman interaktif dan pengambilan keputusan yang lebih baik melalui teknologi immersive",
  },
  {
    title: "Green Construction",
    description: "Praktik ramah lingkungan di setiap proyek untuk keberlanjutan dan efisiensi energi",
  },
]

export const ProfileAbout = () => {
  return (
    <section className="w-full py-20 bg-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6" style={{ fontFamily: "Figtree" }}>
            Tentang PT Inditek Bluprim Mahaksa
          </h2>
          <p className="text-lg text-foreground/70 leading-relaxed mb-6" style={{ fontFamily: "Figtree" }}>
            PT Inditek Bluprim Mahaksa adalah perusahaan konstruksi yang berdiri pada 9 Januari 2024, menyediakan Jasa
            Gambar & Modelling, Renovasi & Bangun Konstruksi, serta Desain dan Analisa Struktur. Kami membawa brand
            barumahID yang telah beroperasi sejak 2018 dengan tagline{" "}
            <span className="font-semibold">"Proyekmu Dibikin Mudah Aja"</span>.
          </p>
          <p className="text-lg text-foreground/70 leading-relaxed" style={{ fontFamily: "Figtree" }}>
            Kami fokus menciptakan ekosistem bisnis konstruksi teknologi di Indonesia dengan menerapkan konsep LBAG
            (Lean, BIM, AI-AR/VR, Green Construction) dalam setiap proyek.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6" style={{ fontFamily: "Figtree" }}>
            Misi & Visi Kami
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white border border-gray-200 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-primary mb-4" style={{ fontFamily: "Figtree" }}>
                Visi
              </h3>
              <p className="text-foreground/70 leading-relaxed" style={{ fontFamily: "Figtree" }}>
                Menjadi Leader dan Pioner dalam Menciptakan Ekosistem Bisnis Konstruksi Teknologi di Indonesia
              </p>
            </div>
            <div className="bg-white border border-gray-200 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-primary mb-4" style={{ fontFamily: "Figtree" }}>
                Misi Utama
              </h3>
              <p className="text-foreground/70 leading-relaxed text-sm" style={{ fontFamily: "Figtree" }}>
                Mengadaptasi teknologi terkini (LBAG), memberikan layanan nyaman & berkualitas dengan harga pantas,
                membangun jaringan kemitraan solid, serta memberikan konsultasi berkualitas untuk klien.
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-12" style={{ fontFamily: "Figtree" }}>
            Konsep Teknologi LBAG
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {lbag.map((tech, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow duration-300"
              >
                <h3 className="text-lg font-bold text-primary mb-3" style={{ fontFamily: "Figtree" }}>
                  {tech.title}
                </h3>
                <p className="text-foreground/70 text-sm leading-relaxed" style={{ fontFamily: "Figtree" }}>
                  {tech.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-12" style={{ fontFamily: "Figtree" }}>
            Keunggulan Kami
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow duration-300"
              >
                <h3 className="text-lg font-bold text-primary mb-3" style={{ fontFamily: "Figtree" }}>
                  {value.title}
                </h3>
                <p className="text-foreground/70 text-sm leading-relaxed" style={{ fontFamily: "Figtree" }}>
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
