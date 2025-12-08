"use client"

import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Plus, Edit2, Trash2, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useAuth } from "@/lib/auth-context"
import { AdminNavbar } from "@/components/AdminNavbar"

interface Feature {
  id: string
  title: string
  description: string
  icon?: string | null
  order: number
}

export default function FeaturesPage() {
  const router = useRouter()
  const { user, isLoading } = useAuth()
  const [features, setFeatures] = useState<Feature[]>([])
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    icon: "",
    order: 0,
  })

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login")
    }
  }, [user, isLoading, router])

  useEffect(() => {
    fetchFeatures()
  }, [])

  const fetchFeatures = async () => {
    try {
      const res = await fetch("/api/content/features")
      const data = await res.json()
      if (Array.isArray(data)) {
        setFeatures(data)
      }
    } catch (error) {
      console.error("Error fetching features:", error)
    }
  }

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      let res
      if (editingId) {
        res = await fetch(`/api/content/features/${editingId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        })
      } else {
        res = await fetch("/api/content/features", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        })
      }

      if (!res.ok) throw new Error("Failed to save feature")

      await fetchFeatures()
      resetForm()
    } catch (error) {
      console.error("Error saving feature:", error)
      alert("Failed to save feature")
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this feature?")) return

    try {
      const res = await fetch(`/api/content/features/${id}`, {
        method: "DELETE",
      })

      if (!res.ok) throw new Error("Failed to delete feature")

      await fetchFeatures()
    } catch (error) {
      console.error("Error deleting feature:", error)
      alert("Failed to delete feature")
    }
  }

  const handleEdit = (feature: Feature) => {
    setFormData({
      title: feature.title,
      description: feature.description,
      icon: feature.icon || "",
      order: feature.order,
    })
    setEditingId(feature.id)
    setShowForm(true)
  }

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      icon: "",
      order: 0,
    })
    setEditingId(null)
    setShowForm(false)
  }

  return (
    <>
      <AdminNavbar />
      <main className="min-h-screen bg-gray-50 pt-20 pb-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center gap-4 mb-8">
            <Link href="/admin/content" className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <ArrowLeft size={20} />
            </Link>
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">Manage Features</h1>
              <p className="text-gray-600">Create and manage company features</p>
            </div>
            <button
              onClick={() => {
                resetForm()
                setShowForm(true)
              }}
              className="ml-auto flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors"
            >
              <Plus size={20} />
              New Feature
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {showForm && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="lg:col-span-1"
              >
                <div className="bg-white rounded-xl border border-gray-200 p-6 sticky top-24">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">
                    {editingId ? "Edit Feature" : "New Feature"}
                  </h3>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Title *</label>
                      <input
                        type="text"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Description *</label>
                      <textarea
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        required
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Icon</label>
                      <input
                        type="text"
                        value={formData.icon}
                        onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                        placeholder="⚡"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Order</label>
                      <input
                        type="number"
                        value={formData.order}
                        onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 0 })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                      />
                    </div>

                    <div className="flex gap-2">
                      <button
                        type="submit"
                        className="flex-1 bg-primary text-primary-foreground py-2 rounded-lg hover:bg-primary/90 transition-colors font-medium"
                      >
                        {editingId ? "Update" : "Create"}
                      </button>
                      <button
                        type="button"
                        onClick={resetForm}
                        className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              </motion.div>
            )}

            <div className={showForm ? "lg:col-span-2" : "lg:col-span-3"}>
              <div className="grid gap-6">
                {features.map((feature, index) => (
                  <motion.div
                    key={feature.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-2xl">{feature.icon || "⭐"}</span>
                          <h3 className="text-xl font-bold text-gray-900">{feature.title}</h3>
                          <span className="text-xs text-gray-500">#{feature.order}</span>
                        </div>
                        <p className="text-gray-600">{feature.description}</p>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleEdit(feature)}
                          className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                          <Edit2 size={18} />
                        </button>
                        <button
                          onClick={() => handleDelete(feature.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
                {features.length === 0 && (
                  <div className="text-center py-12 text-gray-500">No features found. Create your first feature!</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}

