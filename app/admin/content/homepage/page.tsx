"use client"

import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { ArrowLeft, Save } from "lucide-react"
import Link from "next/link"
import { useAuth } from "@/lib/auth-context"
import { AdminNavbar } from "@/components/AdminNavbar"

interface HomePageData {
  id: string
  heroTitle?: string | null
  heroSubtitle?: string | null
  heroDescription?: string | null
  stats?: any
}

export default function HomePageContentPage() {
  const router = useRouter()
  const { user, isLoading } = useAuth()
  const [homePageData, setHomePageData] = useState<HomePageData | null>(null)
  const [formData, setFormData] = useState({
    heroTitle: "",
    heroSubtitle: "",
    heroDescription: "",
    stats: [
      { value: "", description: "" },
      { value: "", description: "" },
      { value: "", description: "" },
      { value: "", description: "" },
    ],
  })
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login")
    }
  }, [user, isLoading, router])

  useEffect(() => {
    fetchHomePage()
  }, [])

  const fetchHomePage = async () => {
    try {
      const res = await fetch("/api/content/homepage")
      const data = await res.json()
      if (data && !data.error) {
        setHomePageData(data)
        setFormData({
          heroTitle: data.heroTitle || "",
          heroSubtitle: data.heroSubtitle || "",
          heroDescription: data.heroDescription || "",
          stats: Array.isArray(data.stats) && data.stats.length > 0 
            ? data.stats.map((stat: any) => ({ value: stat.value || "", description: stat.description || "" }))
            : formData.stats,
        })
      }
    } catch (error) {
      console.error("Error fetching homepage:", error)
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
    setIsSaving(true)

    try {
      const res = await fetch("/api/content/homepage", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })
      
      if (!res.ok) {
        const error = await res.json()
        throw new Error(error.error || "Failed to update homepage")
      }
      
      await fetchHomePage()
      alert("Homepage content berhasil diupdate!")
    } catch (error) {
      console.error("Error saving homepage:", error)
      alert("Failed to save homepage content")
    } finally {
      setIsSaving(false)
    }
  }

  const updateStat = (index: number, field: "value" | "description", value: string) => {
    const newStats = [...formData.stats]
    newStats[index] = { ...newStats[index], [field]: value }
    setFormData({ ...formData, stats: newStats })
  }

  return (
    <>
      <AdminNavbar />
      <main className="min-h-screen bg-gray-50 pt-20 pb-12">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="flex items-center gap-4 mb-8">
            <Link href="/admin/content" className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <ArrowLeft size={20} />
            </Link>
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">Homepage Content</h1>
              <p className="text-gray-600">Edit homepage hero section and stats</p>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Hero Title</label>
                <input
                  type="text"
                  value={formData.heroTitle}
                  onChange={(e) => setFormData({ ...formData, heroTitle: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Hero Subtitle</label>
                <input
                  type="text"
                  value={formData.heroSubtitle}
                  onChange={(e) => setFormData({ ...formData, heroSubtitle: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                  placeholder="Platform Rent-to-Own BarumahID"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Hero Description</label>
                <textarea
                  value={formData.heroDescription}
                  onChange={(e) => setFormData({ ...formData, heroDescription: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none"
                  placeholder="Mulai dari ngekos, akhiri dengan punya rumah. Program rent-to-own inovatif yang mengubah biaya sewa menjadi saldo kepemilikan rumah..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-4">Stats</label>
                <div className="grid grid-cols-2 gap-4">
                  {formData.stats.map((stat, index) => (
                    <div key={index} className="space-y-2">
                      <input
                        type="text"
                        value={stat.value}
                        onChange={(e) => updateStat(index, "value", e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                        placeholder="6+"
                      />
                      <textarea
                        value={stat.description}
                        onChange={(e) => updateStat(index, "description", e.target.value)}
                        rows={2}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none"
                        placeholder="Tahun\nberoperasi"
                      />
                    </div>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                disabled={isSaving}
                className="w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors font-medium disabled:opacity-50"
              >
                <Save size={18} />
                {isSaving ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </form>
        </div>
      </main>
    </>
  )
}

