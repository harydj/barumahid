"use client"

import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { BarChart3, MessageSquare, FileText, Settings, Home } from "lucide-react"
import Link from "next/link"
import { useAuth } from "@/lib/auth-context"
import { AdminNavbar } from "@/components/AdminNavbar"

export default function AdminDashboard() {
  const router = useRouter()
  const { user, isLoading } = useAuth()
  const [stats, setStats] = useState({
    totalConsultations: 0,
    pendingConsultations: 0,
    publishedArticles: 0,
    totalArticles: 0,
  })

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login")
    }
  }, [user, isLoading, router])

  useEffect(() => {
    if (user && user.role === "admin") {
      fetchStats()
    }
  }, [user])

  const fetchStats = async () => {
    try {
      const [consultationsRes, articlesRes] = await Promise.all([
        fetch("/api/consultations"),
        fetch("/api/articles"),
      ])

      if (consultationsRes.ok && articlesRes.ok) {
        const consultations = await consultationsRes.json()
        const articles = await articlesRes.json()

        setStats({
          totalConsultations: consultations.length || 0,
          pendingConsultations: consultations.filter((c: any) => c.status === "pending").length || 0,
          publishedArticles: articles.filter((a: any) => a.status === "published").length || 0,
          totalArticles: articles.length || 0,
        })
      }
    } catch (error) {
      console.error("Error fetching stats:", error)
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

  const dashboardStats = [
    { label: "Total Consultations", value: stats.totalConsultations.toString(), icon: MessageSquare, color: "from-blue-500 to-blue-600" },
    { label: "Pending Reviews", value: stats.pendingConsultations.toString(), icon: FileText, color: "from-yellow-500 to-yellow-600" },
    { label: "Published Articles", value: stats.publishedArticles.toString(), icon: BarChart3, color: "from-green-500 to-green-600" },
    { label: "Total Articles", value: stats.totalArticles.toString(), icon: Settings, color: "from-purple-500 to-purple-600" },
  ]

  return (
    <>
      <AdminNavbar />
      <main className="min-h-screen bg-gray-50 pt-20 pb-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-12"
          >
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
            <p className="text-gray-600">Welcome back, {user.name}!</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {dashboardStats.map((stat, index) => {
              const Icon = stat.icon
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <p className="text-sm text-gray-600 font-medium">{stat.label}</p>
                      <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
                    </div>
                    <div className={`p-3 rounded-lg bg-gradient-to-br ${stat.color}`}>
                      <Icon size={24} className="text-white" />
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>

          <div className="grid grid-cols-1 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <div className="bg-white rounded-xl border border-gray-200 p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick Actions</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Link
                    href="/admin/consultations"
                    className="p-6 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors group"
                  >
                    <MessageSquare size={28} className="text-primary mb-3 group-hover:scale-110 transition-transform" />
                    <h3 className="font-semibold text-gray-900 mb-1">Manage Consultations</h3>
                    <p className="text-sm text-gray-600">Review and respond to consultation requests</p>
                  </Link>
                  <Link
                    href="/admin/content/homepage"
                    className="p-6 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors group"
                  >
                    <Home size={28} className="text-primary mb-3 group-hover:scale-110 transition-transform" />
                    <h3 className="font-semibold text-gray-900 mb-1">Edit Homepage</h3>
                    <p className="text-sm text-gray-600">Edit homepage hero section and stats</p>
                  </Link>
                  <Link
                    href="/admin/content"
                    className="p-6 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors group"
                  >
                    <FileText size={28} className="text-primary mb-3 group-hover:scale-110 transition-transform" />
                    <h3 className="font-semibold text-gray-900 mb-1">Manage Articles</h3>
                    <p className="text-sm text-gray-600">Create, edit, and publish articles</p>
                  </Link>
                  <Link
                    href="/admin/content/services"
                    className="p-6 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors group"
                  >
                    <FileText size={28} className="text-primary mb-3 group-hover:scale-110 transition-transform" />
                    <h3 className="font-semibold text-gray-900 mb-1">Manage Services</h3>
                    <p className="text-sm text-gray-600">Create and manage service offerings</p>
                  </Link>
                  <Link
                    href="/admin/content/features"
                    className="p-6 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors group"
                  >
                    <FileText size={28} className="text-primary mb-3 group-hover:scale-110 transition-transform" />
                    <h3 className="font-semibold text-gray-900 mb-1">Manage Features</h3>
                    <p className="text-sm text-gray-600">Edit company features</p>
                  </Link>
                  <Link
                    href="/admin/content/pricing"
                    className="p-6 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors group"
                  >
                    <FileText size={28} className="text-primary mb-3 group-hover:scale-110 transition-transform" />
                    <h3 className="font-semibold text-gray-900 mb-1">Manage Pricing</h3>
                    <p className="text-sm text-gray-600">Edit pricing packages</p>
                  </Link>
                  <Link
                    href="/admin/content/faq"
                    className="p-6 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors group"
                  >
                    <FileText size={28} className="text-primary mb-3 group-hover:scale-110 transition-transform" />
                    <h3 className="font-semibold text-gray-900 mb-1">Manage FAQs</h3>
                    <p className="text-sm text-gray-600">Edit frequently asked questions</p>
                  </Link>
                  <Link
                    href="/admin/profile/company"
                    className="p-6 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors group"
                  >
                    <FileText size={28} className="text-primary mb-3 group-hover:scale-110 transition-transform" />
                    <h3 className="font-semibold text-gray-900 mb-1">Company Profile</h3>
                    <p className="text-sm text-gray-600">Edit company information</p>
                  </Link>
                  <Link
                    href="/admin/profile/team"
                    className="p-6 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors group"
                  >
                    <FileText size={28} className="text-primary mb-3 group-hover:scale-110 transition-transform" />
                    <h3 className="font-semibold text-gray-900 mb-1">Manage Team</h3>
                    <p className="text-sm text-gray-600">Edit team members</p>
                  </Link>
                  <Link
                    href="/admin/profile/achievements"
                    className="p-6 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors group"
                  >
                    <FileText size={28} className="text-primary mb-3 group-hover:scale-110 transition-transform" />
                    <h3 className="font-semibold text-gray-900 mb-1">Manage Achievements</h3>
                    <p className="text-sm text-gray-600">Edit company achievements</p>
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </main>
    </>
  )
}
