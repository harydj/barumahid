"use client"

import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Plus, Edit2, Trash2, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useAuth } from "@/lib/auth-context"
import { AdminNavbar } from "@/components/AdminNavbar"

interface PricingPackage {
  id: string
  name: string
  description?: string | null
  priceMonthly?: number | null
  priceYearly?: number | null
  popular: boolean
  features?: any
  order: number
}

export default function PricingPage() {
  const router = useRouter()
  const { user, isLoading } = useAuth()
  const [packages, setPackages] = useState<PricingPackage[]>([])
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    priceMonthly: 0,
    priceYearly: 0,
    popular: false,
    features: [] as string[],
    order: 0,
  })
  const [newFeature, setNewFeature] = useState("")

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login")
    }
  }, [user, isLoading, router])

  useEffect(() => {
    fetchPricing()
  }, [])

  const fetchPricing = async () => {
    try {
      const res = await fetch("/api/content/pricing")
      const data = await res.json()
      if (Array.isArray(data)) {
        setPackages(data)
      }
    } catch (error) {
      console.error("Error fetching pricing:", error)
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
      const payload = {
        ...formData,
        priceMonthly: formData.priceMonthly || null,
        priceYearly: formData.priceYearly || null,
        features: formData.features,
      }

      let res
      if (editingId) {
        res = await fetch(`/api/content/pricing/${editingId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        })
      } else {
        res = await fetch("/api/content/pricing", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        })
      }

      if (!res.ok) throw new Error("Failed to save pricing package")

      await fetchPricing()
      resetForm()
    } catch (error) {
      console.error("Error saving pricing:", error)
      alert("Failed to save pricing package")
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this pricing package?")) return

    try {
      const res = await fetch(`/api/content/pricing/${id}`, {
        method: "DELETE",
      })

      if (!res.ok) throw new Error("Failed to delete pricing package")

      await fetchPricing()
    } catch (error) {
      console.error("Error deleting pricing:", error)
      alert("Failed to delete pricing package")
    }
  }

  const handleEdit = (pkg: PricingPackage) => {
    setFormData({
      name: pkg.name,
      description: pkg.description || "",
      priceMonthly: pkg.priceMonthly || 0,
      priceYearly: pkg.priceYearly || 0,
      popular: pkg.popular,
      features: Array.isArray(pkg.features) ? pkg.features : [],
      order: pkg.order,
    })
    setEditingId(pkg.id)
    setShowForm(true)
  }

  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      priceMonthly: 0,
      priceYearly: 0,
      popular: false,
      features: [],
      order: 0,
    })
    setEditingId(null)
    setShowForm(false)
  }

  const addFeature = () => {
    if (newFeature.trim()) {
      setFormData({ ...formData, features: [...formData.features, newFeature.trim()] })
      setNewFeature("")
    }
  }

  const removeFeature = (index: number) => {
    setFormData({ ...formData, features: formData.features.filter((_, i) => i !== index) })
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
              <h1 className="text-4xl font-bold text-gray-900 mb-2">Manage Pricing Packages</h1>
              <p className="text-gray-600">Create and manage pricing packages</p>
            </div>
            <button
              onClick={() => {
                resetForm()
                setShowForm(true)
              }}
              className="ml-auto flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors"
            >
              <Plus size={20} />
              New Package
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
                    {editingId ? "Edit Package" : "New Package"}
                  </h3>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Name *</label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                      <textarea
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        rows={2}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Monthly Price</label>
                        <input
                          type="number"
                          value={formData.priceMonthly}
                          onChange={(e) =>
                            setFormData({ ...formData, priceMonthly: parseFloat(e.target.value) || 0 })
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Yearly Price</label>
                        <input
                          type="number"
                          value={formData.priceYearly}
                          onChange={(e) =>
                            setFormData({ ...formData, priceYearly: parseFloat(e.target.value) || 0 })
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                        />
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={formData.popular}
                        onChange={(e) => setFormData({ ...formData, popular: e.target.checked })}
                        className="w-4 h-4"
                      />
                      <label className="text-sm font-medium text-gray-700">Popular Package</label>
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

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Features</label>
                      <div className="flex gap-2 mb-2">
                        <input
                          type="text"
                          value={newFeature}
                          onChange={(e) => setNewFeature(e.target.value)}
                          onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addFeature())}
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                          placeholder="Add feature"
                        />
                        <button
                          type="button"
                          onClick={addFeature}
                          className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
                        >
                          Add
                        </button>
                      </div>
                      <div className="space-y-1">
                        {formData.features.map((feature, idx) => (
                          <div key={idx} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                            <span className="text-sm">{feature}</span>
                            <button
                              type="button"
                              onClick={() => removeFeature(idx)}
                              className="text-red-600 hover:text-red-800"
                            >
                              ×
                            </button>
                          </div>
                        ))}
                      </div>
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
                {packages.map((pkg, index) => (
                  <motion.div
                    key={pkg.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`bg-white rounded-xl border-2 p-6 hover:shadow-lg transition-shadow ${
                      pkg.popular ? "border-primary" : "border-gray-200"
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-xl font-bold text-gray-900">{pkg.name}</h3>
                          {pkg.popular && (
                            <span className="text-xs bg-primary text-primary-foreground px-2 py-1 rounded">
                              Popular
                            </span>
                          )}
                          <span className="text-xs text-gray-500">#{pkg.order}</span>
                        </div>
                        <p className="text-gray-600 mb-3">{pkg.description}</p>
                        {(pkg.priceMonthly || pkg.priceYearly) && (
                          <div className="flex gap-4 mb-3">
                            {pkg.priceMonthly && (
                              <span className="text-lg font-bold text-primary">
                                Rp {pkg.priceMonthly.toLocaleString()}/month
                              </span>
                            )}
                            {pkg.priceYearly && (
                              <span className="text-lg font-bold text-primary">
                                Rp {pkg.priceYearly.toLocaleString()}/year
                              </span>
                            )}
                          </div>
                        )}
                        {Array.isArray(pkg.features) && pkg.features.length > 0 && (
                          <div className="flex flex-wrap gap-2">
                            {pkg.features.slice(0, 3).map((feature: string, idx: number) => (
                              <span key={idx} className="text-xs bg-gray-100 px-2 py-1 rounded">
                                {feature}
                              </span>
                            ))}
                            {pkg.features.length > 3 && (
                              <span className="text-xs text-gray-500">+{pkg.features.length - 3} more</span>
                            )}
                          </div>
                        )}
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleEdit(pkg)}
                          className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                          <Edit2 size={18} />
                        </button>
                        <button
                          onClick={() => handleDelete(pkg.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
                {packages.length === 0 && (
                  <div className="text-center py-12 text-gray-500">No packages found. Create your first package!</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}

