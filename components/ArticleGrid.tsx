"use client"
import { motion } from "framer-motion"
import { useState } from "react"
import { Calendar, Clock, User } from "lucide-react"

const articles = [
  {
    id: 1,
    title: "Panduan Lengkap Gambar Teknik Konstruksi Modern",
    excerpt: "Pelajari standar dan best practices dalam pembuatan gambar teknik konstruksi yang akurat dan profesional",
    category: "Construction Tips",
    date: "15 Nov 2024",
    readTime: "8 min",
    author: "Bambang Sutrisno",
    image: "🏗️",
    featured: true,
  },
  {
    id: 2,
    title: "Transformasi Digital dalam Industri Konstruksi",
    excerpt: "Bagaimana teknologi BIM dan 3D modeling mengubah cara kita merancang dan membangun",
    category: "Technology",
    date: "12 Nov 2024",
    readTime: "6 min",
    author: "Ahmad Wijaya",
    image: "💻",
  },
  {
    id: 3,
    title: "Case Study: Proyek Gedung Pencakar Langit 50 Lantai",
    excerpt: "Studi kasus implementasi teknologi barumahID dalam proyek konstruksi berskala besar di Jakarta",
    category: "Case Studies",
    date: "10 Nov 2024",
    readTime: "10 min",
    author: "Siti Nurhaliza",
    image: "🏢",
  },
  {
    id: 4,
    title: "Efisiensi Biaya dengan Estimasi Akurat",
    excerpt: "Tips menggunakan cost estimation untuk mengoptimalkan anggaran proyek konstruksi Anda",
    category: "Construction Tips",
    date: "08 Nov 2024",
    readTime: "5 min",
    author: "Rina Kartika",
    image: "💰",
  },
  {
    id: 5,
    title: "Standar Keselamatan Konstruksi 2024",
    excerpt: "Update terbaru mengenai standar keselamatan dan regulasi industri konstruksi untuk tahun 2024",
    category: "News",
    date: "05 Nov 2024",
    readTime: "7 min",
    author: "Tim Editorial",
    image: "⚠️",
  },
  {
    id: 6,
    title: "Menggunakan Rendering 3D untuk Presentasi Client",
    excerpt: "Strategi efektif menggunakan visualisasi 3D untuk meningkatkan penjualan dan kepuasan klien",
    category: "Technology",
    date: "01 Nov 2024",
    readTime: "6 min",
    author: "Ahmad Wijaya",
    image: "🎨",
  },
]

const categories = ["Semua", "Construction Tips", "Technology", "Case Studies", "News"]

export const ArticleGrid = () => {
  const [selectedCategory, setSelectedCategory] = useState("Semua")

  return (
    <section className="w-full py-20 bg-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h2 className="text-3xl font-bold text-foreground mb-8" style={{ fontFamily: "Figtree" }}>
            Kategori
          </h2>
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  selectedCategory === category
                    ? "bg-primary text-primary-foreground"
                    : "bg-white border border-gray-200 text-foreground hover:border-primary"
                }`}
                style={{ fontFamily: "Figtree" }}
              >
                {category}
              </button>
            ))}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {articles.map((article, index) => (
            <motion.article
              key={article.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer group ${
                article.featured ? "md:col-span-2 md:row-span-1" : ""
              }`}
            >
              <div className="bg-gradient-to-br from-primary/20 to-accent/20 py-12 text-5xl text-center group-hover:scale-110 transition-transform duration-300">
                {article.image}
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs font-bold text-primary bg-primary/10 px-3 py-1 rounded-full">
                    {article.category}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                  {article.title}
                </h3>
                <p className="text-foreground/70 mb-4 text-sm leading-relaxed">{article.excerpt}</p>

                <div className="flex flex-wrap items-center gap-4 text-xs text-foreground/60 border-t border-gray-100 pt-4">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{article.date}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{article.readTime}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <User className="w-3.5 h-3.5" />
                    <span>{article.author}</span>
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <button
            className="bg-primary text-primary-foreground px-8 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors"
            style={{ fontFamily: "Figtree" }}
          >
            Lihat Artikel Lainnya
          </button>
        </motion.div>
      </div>
    </section>
  )
}
