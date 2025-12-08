"use client"
import { motion } from "framer-motion"
import type React from "react"

import { Mail, Phone, MapPin, Clock, MessageSquare, Send } from "lucide-react"
import { useState, useEffect } from "react"

type ContactInfoItem = {
  id: string
  type: string
  title: string
  details: string[]
  order: number
}

const faqItems = [
  {
    question: "Apa itu barumahID dan bagaimana cara kerjanya?",
    answer:
      "barumahID adalah platform digitalisasi inovatif untuk industri konstruksi yang menyediakan layanan construction drawing, structural design, dan 3D modeling menggunakan teknologi LBAG (Lean, BIM, AI-AR/VR, Green Construction).",
  },
  {
    question: "Berapa lama waktu pengerjaan untuk setiap proyek?",
    answer:
      "Waktu pengerjaan tergantung kompleksitas proyek. Proyek kecil: 1-2 minggu, proyek menengah: 3-4 minggu, proyek besar: 1-3 bulan. Kami selalu berkomitmen menyelesaikan tepat jadwal.",
  },
  {
    question: "Apakah layanan Anda mencakup konsultasi teknis?",
    answer:
      "Ya, semua paket kami termasuk konsultasi dengan tim engineer profesional. Kami siap memberikan rekomendasi teknis, analisis struktur, dan solusi inovatif untuk optimasi desain dan budget.",
  },
  {
    question: "Bisakah saya mengerjakan revisi dan modifikasi desain?",
    answer:
      "Tentu saja. Kami memberikan beberapa putaran revisi sesuai paket pilihan. Revisi tak terbatas juga tersedia sebagai layanan tambahan.",
  },
]

export const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    projectType: "",
    message: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [contactInfo, setContactInfo] = useState<ContactInfoItem[]>([])
  const [isLoadingContactInfo, setIsLoadingContactInfo] = useState(true)

  useEffect(() => {
    async function fetchContactInfo() {
      try {
        const res = await fetch('/api/contact/info')
        const data = await res.json()
        if (Array.isArray(data)) {
          const mapped = data.map((item: any) => ({
            ...item,
            details: Array.isArray(item.details) ? item.details : [],
            icon: item.type === 'phone' ? Phone : item.type === 'email' ? Mail : item.type === 'location' ? MapPin : Clock,
            color: "text-primary",
          }))
          setContactInfo(mapped)
        }
      } catch (error) {
        console.error('Error fetching contact info:', error)
      } finally {
        setIsLoadingContactInfo(false)
      }
    }
    fetchContactInfo()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (!res.ok) {
        throw new Error('Failed to submit contact form')
      }

      setFormData({ name: "", email: "", phone: "", company: "", projectType: "", message: "" })
      alert('Pesan berhasil dikirim! Kami akan menghubungi Anda segera.')
    } catch (error) {
      console.error('Error submitting contact form:', error)
      alert('Gagal mengirim pesan. Silakan coba lagi.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  return (
    <section className="w-full py-20 bg-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Contact Info Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
        >
          {isLoadingContactInfo ? (
            <div className="col-span-4 text-center text-gray-500">Loading contact info...</div>
          ) : contactInfo.length > 0 ? (
            contactInfo.map((info, index) => {
              const Icon = info.icon as React.ComponentType<{ className?: string }>
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow duration-300"
              >
                <Icon className={`w-8 h-8 ${info.color} mb-3`} />
                <h3 className="text-lg font-bold text-foreground mb-3" style={{ fontFamily: "Figtree" }}>
                  {info.title}
                </h3>
                <div className="space-y-2">
                  {info.details.map((detail, idx) => (
                    <p key={idx} className="text-sm text-foreground/70" style={{ fontFamily: "Figtree" }}>
                      {detail}
                    </p>
                  ))}
                </div>
              </motion.div>
            )
          })) : null}
        </motion.div>

        {/* Form Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="mb-16 grid lg:grid-cols-2 gap-12"
        >
          {/* Contact Form */}
          <div className="bg-white border border-gray-200 rounded-xl p-8">
            <h2 className="text-2xl font-bold text-foreground mb-6" style={{ fontFamily: "Figtree" }}>
              Hubungi Kami
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2" style={{ fontFamily: "Figtree" }}>
                  Nama Lengkap
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-primary transition-colors"
                  style={{ fontFamily: "Figtree" }}
                  placeholder="Masukkan nama Anda"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-foreground mb-2" style={{ fontFamily: "Figtree" }}>
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-primary transition-colors"
                  style={{ fontFamily: "Figtree" }}
                  placeholder="email@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-foreground mb-2" style={{ fontFamily: "Figtree" }}>
                  Nomor Telepon
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-primary transition-colors"
                  style={{ fontFamily: "Figtree" }}
                  placeholder="+62-XXX-XXXX-XXXX"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-foreground mb-2" style={{ fontFamily: "Figtree" }}>
                  Nama Perusahaan
                </label>
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-primary transition-colors"
                  style={{ fontFamily: "Figtree" }}
                  placeholder="PT. Nama Perusahaan"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-foreground mb-2" style={{ fontFamily: "Figtree" }}>
                  Jenis Proyek
                </label>
                <select
                  name="projectType"
                  value={formData.projectType}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-primary transition-colors"
                  style={{ fontFamily: "Figtree" }}
                >
                  <option value="">Pilih jenis proyek</option>
                  <option value="residential">Residensial</option>
                  <option value="commercial">Komersial</option>
                  <option value="industrial">Industri</option>
                  <option value="infrastructure">Infrastruktur</option>
                  <option value="other">Lainnya</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-foreground mb-2" style={{ fontFamily: "Figtree" }}>
                  Pesan
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-primary transition-colors resize-none"
                  style={{ fontFamily: "Figtree" }}
                  placeholder="Deskripsikan kebutuhan proyek Anda..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-primary text-primary-foreground py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                style={{ fontFamily: "Figtree" }}
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
                    Mengirim...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Kirim Pesan
                  </>
                )}
              </button>
            </form>
          </div>

          {/* FAQ Section */}
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-6" style={{ fontFamily: "Figtree" }}>
              Pertanyaan Umum
            </h2>
            <div className="space-y-4">
              {faqItems.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-300"
                >
                  <div className="flex gap-3">
                    <MessageSquare className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-semibold text-foreground mb-2" style={{ fontFamily: "Figtree" }}>
                        {item.question}
                      </h4>
                      <p className="text-sm text-foreground/70 leading-relaxed" style={{ fontFamily: "Figtree" }}>
                        {item.answer}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Newsletter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="bg-white border border-gray-200 rounded-xl p-8 md:p-12 text-center"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4" style={{ fontFamily: "Figtree" }}>
            Berlangganan Newsletter
          </h2>
          <p className="text-foreground/70 mb-6 max-w-2xl mx-auto" style={{ fontFamily: "Figtree" }}>
            Dapatkan tips, insights, dan update terbaru tentang industri konstruksi dan teknologi digitalisasi
          </p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Masukkan email Anda"
              className="flex-1 px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-primary transition-colors"
              style={{ fontFamily: "Figtree" }}
            />
            <button
              className="bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors whitespace-nowrap"
              style={{ fontFamily: "Figtree" }}
            >
              Subscribe
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
