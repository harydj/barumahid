"use client"

import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Plus, Edit2, Trash2, Eye } from "lucide-react"
import { useAuth } from "@/lib/auth-context"
import { AdminNavbar } from "@/components/AdminNavbar"

interface Article {
  id: number
  title: string
  excerpt: string
  category: string
  image: string
  publishedAt: string
  status: "draft" | "published"
  views: number
}

export default function ContentPage() {
  const router = useRouter()
  const { user, isLoading } = useAuth()
  const [articles, setArticles] = useState<Article[]>([])
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [formData, setFormData] = useState({
    title: "",
    excerpt: "",
    category: "construction-tips",
    image: "",
    status: "draft" as const,
  })

  const defaultArticles: Article[] = [
    {
      id: 1,
      title: "5 Tips for Efficient Construction Planning",
      excerpt: "Learn how to plan your construction project efficiently...",
      category: "construction-tips",
      image: "/construction-planning.jpg",
      publishedAt: "2024-01-15",
      status: "published",
      views: 1250,
    },
    {
      id: 2,
      title: "Latest Technologies in 3D Modeling",
      excerpt: "Discover the latest advancements in 3D modeling technology...",
      category: "technology",
      image: "/3d-modeling.jpg",
      publishedAt: "2024-01-10",
      status: "published",
      views: 890,
    },
  ]

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login")
    }
  }, [user, isLoading, router])

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("articles") || "[]")
    if (stored.length === 0) {
      setArticles(defaultArticles)
      localStorage.setItem("articles", JSON.stringify(defaultArticles))
    } else {
      setArticles(stored)
    }
  }, [])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!user || user.role !== "admin") {
    return null
  }

  const handleAddArticle = () => {
    if (!formData.title || !formData.excerpt) return

    let updated
    if (editingId) {
      updated = articles.map((a) =>
        a.id === editingId ? { ...a, ...formData, publishedAt: new Date().toISOString().split("T")[0] } : a,
      )
    } else {
      updated = [
        ...articles,
        {
          id: Date.now(),
          ...formData,
          publishedAt: new Date().toISOString().split("T")[0],
          views: 0,
        },
      ]
    }

    setArticles(updated)
    localStorage.setItem("articles", JSON.stringify(updated))
    setFormData({ title: "", excerpt: "", category: "construction-tips", image: "", status: "draft" })
    setShowForm(false)
    setEditingId(null)
  }

  const handleDelete = (id: number) => {
    const updated = articles.filter((a) => a.id !== id)
    setArticles(updated)
    localStorage.setItem("articles", JSON.stringify(updated))
  }

  const handleEdit = (article: Article) => {
    setFormData({
      title: article.title,
      excerpt: article.excerpt,
      category: article.category,
      image: article.image,
      status: article.status,
    })
    setEditingId(article.id)
    setShowForm(true)
  }

  return (
    <>
      <AdminNavbar />
      <main className="min-h-screen bg-gray-50 pt-20 pb-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center justify-between mb-8"
          >
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">Content Management</h1>
              <p className="text-gray-600">Create and manage articles</p>
            </div>
            <button
              onClick={() => {
                setShowForm(!showForm)
                setEditingId(null)
                setFormData({ title: "", excerpt: "", category: "construction-tips", image: "", status: "draft" })
              }}
              className="flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors"
            >
              <Plus size={20} />
              New Article
            </button>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {showForm && (
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="lg:col-span-1">
                <div className="bg-white rounded-xl border border-gray-200 p-6 sticky top-24">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">{editingId ? "Edit Article" : "New Article"}</h3>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                      <input
                        type="text"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                        placeholder="Article title"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Excerpt</label>
                      <textarea
                        value={formData.excerpt}
                        onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none"
                        placeholder="Brief description"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                      <select
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                      >
                        <option value="construction-tips">Construction Tips</option>
                        <option value="technology">Technology</option>
                        <option value="case-studies">Case Studies</option>
                        <option value="news">News</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                      <select
                        value={formData.status}
                        onChange={(e) => setFormData({ ...formData, status: e.target.value as "draft" | "published" })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                      >
                        <option value="draft">Draft</option>
                        <option value="published">Published</option>
                      </select>
                    </div>

                    <button
                      onClick={handleAddArticle}
                      className="w-full bg-primary text-primary-foreground py-2 rounded-lg hover:bg-primary/90 transition-colors font-medium"
                    >
                      {editingId ? "Update" : "Create"} Article
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            <div className={showForm ? "lg:col-span-2" : "lg:col-span-3"}>
              <div className="grid gap-6">
                {articles.map((article, index) => (
                  <motion.div
                    key={article.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-xl font-bold text-gray-900">{article.title}</h3>
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${
                              article.status === "published"
                                ? "bg-green-100 text-green-700"
                                : "bg-gray-100 text-gray-700"
                            }`}
                          >
                            {article.status}
                          </span>
                        </div>
                        <p className="text-gray-600 mb-3">{article.excerpt}</p>
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <span className="capitalize">{article.category.replace("-", " ")}</span>
                          <span>{article.publishedAt}</span>
                          <span className="flex items-center gap-1">
                            <Eye size={16} />
                            {article.views} views
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleEdit(article)}
                          className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                          <Edit2 size={18} />
                        </button>
                        <button
                          onClick={() => handleDelete(article.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
