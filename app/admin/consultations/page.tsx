"use client"

import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Eye, Trash2, Check } from "lucide-react"
import { useAuth } from "@/lib/auth-context"
import { AdminNavbar } from "@/components/AdminNavbar"

interface Consultation {
  id: string
  name: string
  email: string
  phone: string
  company: string | null
  projectType: string
  description: string
  budget: string | null
  status: "pending" | "reviewed" | "completed"
  createdAt: string
}

export default function ConsultationsPage() {
  const router = useRouter()
  const { user, isLoading } = useAuth()
  const [consultations, setConsultations] = useState<Consultation[]>([])
  const [selectedConsult, setSelectedConsult] = useState<Consultation | null>(null)
  const [statusFilter, setStatusFilter] = useState<"all" | "pending" | "reviewed" | "completed">("all")

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login")
    }
  }, [user, isLoading, router])

  useEffect(() => {
    async function fetchConsultations() {
      try {
        const res = await fetch('/api/consultations')
        const data = await res.json()
        if (Array.isArray(data)) {
          setConsultations(data)
        }
      } catch (error) {
        console.error('Error fetching consultations:', error)
      }
    }
    fetchConsultations()
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

  const filteredConsultations = consultations.filter((c) => statusFilter === "all" || c.status === statusFilter)

  const handleStatusChange = async (id: string, newStatus: "pending" | "reviewed" | "completed") => {
    try {
      const res = await fetch(`/api/consultations/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      })

      if (!res.ok) {
        throw new Error('Failed to update consultation')
      }

      const updated = consultations.map((c) => (c.id === id ? { ...c, status: newStatus } : c))
      setConsultations(updated)
      if (selectedConsult?.id === id) {
        setSelectedConsult({ ...selectedConsult, status: newStatus })
      }
    } catch (error) {
      console.error('Error updating consultation:', error)
      alert('Failed to update consultation')
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this consultation?')) {
      return
    }

    try {
      const res = await fetch(`/api/consultations/${id}`, {
        method: 'DELETE',
      })

      if (!res.ok) {
        throw new Error('Failed to delete consultation')
      }

      const updated = consultations.filter((c) => c.id !== id)
      setConsultations(updated)
      setSelectedConsult(null)
    } catch (error) {
      console.error('Error deleting consultation:', error)
      alert('Failed to delete consultation')
    }
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
            className="mb-8"
          >
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Consultation Requests</h1>
            <p className="text-gray-600">Manage and respond to consultation requests</p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                <div className="p-6 border-b border-gray-200">
                  <div className="flex items-center gap-3">
                    {["all", "pending", "reviewed", "completed"].map((filter) => (
                      <button
                        key={filter}
                        onClick={() => setStatusFilter(filter as any)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all capitalize ${
                          statusFilter === filter
                            ? "bg-primary text-primary-foreground"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                      >
                        {filter}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-200">
                      <tr>
                        <th className="text-left px-6 py-3 text-sm font-semibold text-gray-700">Name</th>
                        <th className="text-left px-6 py-3 text-sm font-semibold text-gray-700">Service</th>
                        <th className="text-left px-6 py-3 text-sm font-semibold text-gray-700">Status</th>
                        <th className="text-left px-6 py-3 text-sm font-semibold text-gray-700">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredConsultations.length === 0 ? (
                        <tr>
                          <td colSpan={4} className="px-6 py-8 text-center text-gray-500">
                            No consultation requests found
                          </td>
                        </tr>
                      ) : (
                        filteredConsultations.map((consult, index) => (
                          <motion.tr
                            key={consult.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                            className="border-b border-gray-200 hover:bg-gray-50 transition-colors"
                          >
                            <td className="px-6 py-4">
                              <div>
                                <p className="font-medium text-gray-900">{consult.name}</p>
                                <p className="text-sm text-gray-600">{consult.email}</p>
                              </div>
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-600 capitalize">
                              {consult.projectType.replace("-", " ")}
                            </td>
                            <td className="px-6 py-4">
                              <span
                                className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium capitalize ${
                                  consult.status === "pending"
                                    ? "bg-yellow-100 text-yellow-700"
                                    : consult.status === "reviewed"
                                      ? "bg-blue-100 text-blue-700"
                                      : "bg-green-100 text-green-700"
                                }`}
                              >
                                {consult.status}
                              </span>
                            </td>
                            <td className="px-6 py-4">
                              <button
                                onClick={() => setSelectedConsult(consult)}
                                className="text-primary hover:text-primary/80 transition-colors"
                              >
                                <Eye size={18} />
                              </button>
                            </td>
                          </motion.tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {selectedConsult && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white rounded-xl border border-gray-200 p-6 h-fit sticky top-24"
              >
                <h3 className="text-xl font-bold text-gray-900 mb-4">Consultation Details</h3>

                <div className="space-y-4 mb-6">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Name</p>
                    <p className="font-medium text-gray-900">{selectedConsult.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Email</p>
                    <p className="font-medium text-gray-900">{selectedConsult.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Phone</p>
                    <p className="font-medium text-gray-900">{selectedConsult.phone}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Company</p>
                    <p className="font-medium text-gray-900">{selectedConsult.company || "-"}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Budget</p>
                    <p className="font-medium text-gray-900 capitalize">{selectedConsult.budget.replace("-", " ")}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Description</p>
                    <p className="text-gray-700 text-sm">{selectedConsult.description}</p>
                  </div>
                </div>

                <div className="space-y-2 mb-6 pt-6 border-t border-gray-200">
                  <button
                    onClick={() => handleStatusChange(selectedConsult.id, "reviewed")}
                    className="w-full flex items-center justify-center gap-2 bg-blue-50 text-blue-600 hover:bg-blue-100 py-2 rounded-lg transition-colors text-sm font-medium"
                  >
                    <Check size={16} />
                    Mark as Reviewed
                  </button>
                  <button
                    onClick={() => handleStatusChange(selectedConsult.id, "completed")}
                    className="w-full flex items-center justify-center gap-2 bg-green-50 text-green-600 hover:bg-green-100 py-2 rounded-lg transition-colors text-sm font-medium"
                  >
                    <Check size={16} />
                    Mark as Completed
                  </button>
                  <button
                    onClick={() => handleDelete(selectedConsult.id)}
                    className="w-full flex items-center justify-center gap-2 bg-red-50 text-red-600 hover:bg-red-100 py-2 rounded-lg transition-colors text-sm font-medium"
                  >
                    <Trash2 size={16} />
                    Delete
                  </button>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </main>
    </>
  )
}
