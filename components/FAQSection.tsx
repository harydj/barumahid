"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Plus } from "lucide-react"

type FAQItem = {
  question: string
  answer: string
}

const defaultFAQs: FAQItem[] = [
  {
    question: "Apa itu barumahID dan bagaimana cara kerjanya?",
    answer:
      "barumahID adalah platform digitalisasi inovatif untuk industri konstruksi yang menyediakan layanan construction drawing, structural design, dan 3D modeling. Kami menggunakan teknologi CAD dan BIM terkini untuk menghasilkan desain presisi tinggi. Tim profesional kami bekerja sama dengan klien untuk memahami kebutuhan spesifik proyek dan memberikan solusi terbaik.",
  },
  {
    question: "Berapa lama waktu pengerjaan untuk setiap proyek?",
    answer:
      "Waktu pengerjaan tergantung pada kompleksitas dan skala proyek. Untuk proyek kecil, biasanya memerlukan 1-2 minggu. Proyek menengah berkisar 3-4 minggu, sedangkan proyek besar bisa memerlukan 1-3 bulan. Kami selalu berkomitmen menyelesaikan pekerjaan tepat jadwal sesuai kesepakatan awal.",
  },
  {
    question: "Apakah layanan Anda mencakup konsultasi teknis?",
    answer:
      "Ya, semua paket kami termasuk konsultasi dengan tim engineer profesional kami. Kami siap memberikan rekomendasi teknis, analisis struktur, dan solusi inovatif untuk optimasi desain dan budget proyek Anda. Untuk proyek enterprise, kami menyediakan account manager dedicated.",
  },
  {
    question: "Bisakah Anda mengerjakan revisi dan modifikasi desain?",
    answer:
      "Tentu saja. Kami memberikan beberapa putaran revisi sesuai paket yang dipilih. Tim kami siap mengimplementasikan feedback Anda dengan cepat dan profesional. Revisi tak terbatas juga tersedia sebagai layanan tambahan jika diperlukan.",
  },
]

export const FAQSection = ({
  title = "Pertanyaan yang Sering Diajukan",
  faqs = defaultFAQs,
}: { title?: string; faqs?: FAQItem[] }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section className="w-full py-24 px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-12 gap-16">
          <div className="lg:col-span-4">
            <h2
              className="text-5xl font-bold text-foreground tracking-tight sticky top-24"
              style={{
                fontFamily: "Figtree",
                fontWeight: "700",
              }}
            >
              {title}
            </h2>
          </div>

          <div className="lg:col-span-8">
            <div className="space-y-0">
              {faqs.map((faq, index) => (
                <div key={index} className="border-b border-border last:border-b-0">
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="w-full flex items-center justify-between py-6 text-left group hover:opacity-70 transition-opacity duration-150"
                    aria-expanded={openIndex === index}
                  >
                    <span
                      className="text-lg leading-7 text-foreground pr-8 font-medium"
                      style={{
                        fontFamily: "Figtree",
                      }}
                    >
                      {faq.question}
                    </span>
                    <motion.div
                      animate={{
                        rotate: openIndex === index ? 45 : 0,
                      }}
                      transition={{
                        duration: 0.2,
                      }}
                      className="flex-shrink-0"
                    >
                      <Plus className="w-6 h-6 text-foreground" strokeWidth={1.5} />
                    </motion.div>
                  </button>

                  <AnimatePresence initial={false}>
                    {openIndex === index && (
                      <motion.div
                        initial={{
                          height: 0,
                          opacity: 0,
                        }}
                        animate={{
                          height: "auto",
                          opacity: 1,
                        }}
                        exit={{
                          height: 0,
                          opacity: 0,
                        }}
                        transition={{
                          duration: 0.3,
                        }}
                        className="overflow-hidden"
                      >
                        <div className="pb-6 pr-12">
                          <p
                            className="text-lg leading-6 text-foreground/70"
                            style={{
                              fontFamily: "Figtree",
                            }}
                          >
                            {faq.answer}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
