"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { PortfolioNavbar } from "@/components/PortfolioNavbar"
import { useAuth } from "@/lib/auth-context"
import { motion } from "framer-motion"
import { Plus, Edit2, Trash2, Home, MapPin, DollarSign, Loader2 } from "lucide-react"
import Link from "next/link"

interface Kos {
  id: string
  name: string
  slug: string
  address: string
  city: string
  province: string
  priceMonthly: number
  type: string
  roomType: string
  isBarumahIDPartner: boolean
  ownershipPercentage: number | null
  status: string
}

export default function KosManagementPage() {
  const router = useRouter()
  const { user, isLoading: authLoading } = useAuth()
  const [kosList, setKosList] = useState<Kos[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    address: "",
    city: "",
    province: "",
    postalCode: "",
    priceMonthly: "",
    priceYearly: "",
    type: "campur",
    roomType: "single",
    isBarumahIDPartner: false,
    ownershipPercentage: "",
    status: "active",
  })

  useEffect(() => {
    if (!authLoading && (!user || (user.role !== "admin" && user.role !== "kos_owner"))) {
      router.push("/login")
    } else if (user && (user.role === "admin" || user.role === "kos_owner")) {
      fetchKos()
    }
  }, [user, authLoading, router])

  const fetchKos = async () => {
    try {
      // For kos_owner, filter by their ownerId (match by email)
      if (user?.role === "kos_owner") {
        // Find KosOwner by email
        const ownerRes = await fetch(`/api/kos-owner?email=${user.email}`)
        if (ownerRes.ok) {
          const owner = await ownerRes.json()
          if (owner?.id) {
            const res = await fetch(`/api/kos?ownerId=${owner.id}`)
            if (res.ok) {
              const data = await res.json()
              setKosList(data)
            }
          } else {
            // No owner found, show empty list
            setKosList([])
          }
        }
      } else {
        // For admin, show all kos
        const res = await fetch(`/api/kos`)
        if (res.ok) {
          const data = await res.json()
          setKosList(data)
        }
      }
    } catch (error) {
      console.error("Error fetching kos:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      // Get ownerId for kos_owner
      let ownerId = null
      if (user?.role === "kos_owner") {
        const ownerRes = await fetch(`/api/kos-owner?email=${user.email}`)
        if (ownerRes.ok) {
          const owner = await ownerRes.json()
          ownerId = owner?.id
        }
      }

      const payload = {
        ...formData,
        priceMonthly: parseFloat(formData.priceMonthly),
        priceYearly: formData.priceYearly ? parseFloat(formData.priceYearly) : null,
        ownershipPercentage: formData.ownershipPercentage ? parseFloat(formData.ownershipPercentage) : null,
        ownerId: ownerId,
      }

      if (editingId) {
        const res = await fetch(`/api/kos/${editingId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        })
        if (res.ok) {
          alert("Kos berhasil diupdate!")
          setShowForm(false)
          setEditingId(null)
          fetchKos()
        }
      } else {
        const res = await fetch("/api/kos", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        })
        if (res.ok) {
          alert("Kos berhasil ditambahkan!")
          setShowForm(false)
          fetchKos()
        }
      }
    } catch (error) {
      console.error("Error saving kos:", error)
      alert("Gagal menyimpan kos")
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Yakin ingin menghapus kos ini?")) return

    try {
      const res = await fetch(`/api/kos/${id}`, { method: "DELETE" })
      if (res.ok) {
        alert("Kos berhasil dihapus!")
        fetchKos()
      }
    } catch (error) {
      console.error("Error deleting kos:", error)
      alert("Gagal menghapus kos")
    }
  }

  if (authLoading || isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader2 className="animate-spin text-primary" size={32} />
      </div>
    )
  }

  if (!user || (user.role !== "admin" && user.role !== "kos_owner")) {
    return null
  }

  return (
    <>
      <PortfolioNavbar />
      <main className="min-h-screen bg-gray-50 pt-20 pb-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-4xl font-bold text-gray-900 mb-2">Kelola Kos</h1>
                <p className="text-gray-600">Manage kos mitra BarumahID Anda</p>
              </div>
              <button
                onClick={() => {
                  setShowForm(!showForm)
                  setEditingId(null)
                  setFormData({
                    name: "",
                    description: "",
                    address: "",
                    city: "",
                    province: "",
                    postalCode: "",
                    priceMonthly: "",
                    priceYearly: "",
                    type: "campur",
                    roomType: "single",
                    isBarumahIDPartner: false,
                    ownershipPercentage: "",
                    status: "active",
                  })
                }}
                className="flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors"
              >
                <Plus size={20} />
                {showForm ? "Tutup Form" : "Tambah Kos"}
              </button>
            </div>
          </motion.div>

          {showForm && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl border border-gray-200 p-6 mb-6"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                {editingId ? "Edit Kos" : "Tambah Kos Baru"}
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Nama Kos *</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Kota *</label>
                    <input
                      type="text"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      required
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Provinsi *</label>
                    <input
                      type="text"
                      value={formData.province}
                      onChange={(e) => setFormData({ ...formData, province: e.target.value })}
                      required
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Harga Bulanan (Rp) *</label>
                    <input
                      type="number"
                      value={formData.priceMonthly}
                      onChange={(e) => setFormData({ ...formData, priceMonthly: e.target.value })}
                      required
                      min="0"
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Tipe *</label>
                    <select
                      value={formData.type}
                      onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                      required
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary/20"
                    >
                      <option value="putra">Putra</option>
                      <option value="putri">Putri</option>
                      <option value="campur">Campur</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Tipe Kamar *</label>
                    <select
                      value={formData.roomType}
                      onChange={(e) => setFormData({ ...formData, roomType: e.target.value })}
                      required
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary/20"
                    >
                      <option value="single">Single</option>
                      <option value="double">Double</option>
                      <option value="triple">Triple</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Alamat Lengkap *</label>
                  <textarea
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    required
                    rows={3}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Deskripsi *</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    required
                    rows={4}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                </div>
                <div className="flex items-center gap-4">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={formData.isBarumahIDPartner}
                      onChange={(e) => setFormData({ ...formData, isBarumahIDPartner: e.target.checked })}
                      className="w-4 h-4 text-primary rounded"
                    />
                    <span className="text-sm text-gray-700">Mitra BarumahID (Rent-to-Own)</span>
                  </label>
                </div>
                {formData.isBarumahIDPartner && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Persentase Saldo (%)
                    </label>
                    <input
                      type="number"
                      value={formData.ownershipPercentage}
                      onChange={(e) => setFormData({ ...formData, ownershipPercentage: e.target.value })}
                      min="0"
                      max="100"
                      step="0.1"
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                )}
                <button
                  type="submit"
                  className="w-full bg-primary text-primary-foreground py-2 rounded-lg hover:bg-primary/90 transition-colors font-medium"
                >
                  {editingId ? "Update" : "Tambah"} Kos
                </button>
              </form>
            </motion.div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {kosList.map((kos) => (
              <motion.div
                key={kos.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{kos.name}</h3>
                    <div className="flex items-center gap-2 text-gray-600 mb-2">
                      <MapPin size={16} />
                      <span className="text-sm">{kos.city}, {kos.province}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600 mb-2">
                      <DollarSign size={16} />
                      <span className="text-sm">Rp {kos.priceMonthly.toLocaleString('id-ID')}/bulan</span>
                    </div>
                    {kos.isBarumahIDPartner && (
                      <span className="inline-block bg-primary/10 text-primary px-2 py-1 rounded text-xs font-semibold">
                        Mitra Rent-to-Own
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      setEditingId(kos.id)
                      setShowForm(true)
                      setFormData({
                        name: kos.name,
                        description: "",
                        address: kos.address,
                        city: kos.city,
                        province: kos.province,
                        postalCode: "",
                        priceMonthly: kos.priceMonthly.toString(),
                        priceYearly: "",
                        type: kos.type,
                        roomType: kos.roomType,
                        isBarumahIDPartner: kos.isBarumahIDPartner,
                        ownershipPercentage: kos.ownershipPercentage?.toString() || "",
                        status: kos.status,
                      })
                    }}
                    className="flex-1 flex items-center justify-center gap-2 bg-primary/10 text-primary py-2 rounded-lg hover:bg-primary/20 transition-colors"
                  >
                    <Edit2 size={16} />
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(kos.id)}
                    className="flex-1 flex items-center justify-center gap-2 bg-red-50 text-red-600 py-2 rounded-lg hover:bg-red-100 transition-colors"
                  >
                    <Trash2 size={16} />
                    Hapus
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </main>
    </>
  )
}

