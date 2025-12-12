"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { PortfolioNavbar } from "@/components/PortfolioNavbar"
import { useAuth } from "@/lib/auth-context"
import { Home, Calculator, Search, FileText, TrendingUp, Clock, CheckCircle } from "lucide-react"
import Link from "next/link"

interface DashboardData {
  program: {
    status: string
    ownershipBalance: number
    targetBalance: number | null
  }
  recentPayments: Array<{
    id: string
    amount: number
    ownershipAmount: number
    paymentDate: string
    status: string
  }>
  stats: {
    totalPaid: number
    monthsActive: number
    progressPercentage: number
  }
}

export default function DashboardPage() {
  const router = useRouter()
  const { user, isLoading: authLoading } = useAuth()
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/login")
    } else if (user && user.role !== "admin") {
      fetchDashboard()
    }
  }, [user, authLoading, router])

  const fetchDashboard = async () => {
    try {
      const res = await fetch("/api/user/dashboard", { cache: 'no-store' })
      if (res.ok) {
        const data = await res.json()
        setDashboardData(data)
      }
    } catch (error) {
      console.error("Error fetching dashboard:", error)
    } finally {
      setIsLoading(false)
    }
  }

  if (authLoading || isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!user || user.role === "admin") {
    return null
  }

  const statusLabels: Record<string, string> = {
    ngekos: "Ngekos",
    mengumpulkan_saldo: "Mengumpulkan Saldo",
    siap_konstruksi: "Siap Konstruksi",
    bangun_rumah: "Bangun Rumah",
    valuasi: "Valuasi",
    kontrak_btn: "Kontrak BTN",
  }

  const statusColors: Record<string, string> = {
    ngekos: "bg-blue-100 text-blue-800",
    mengumpulkan_saldo: "bg-yellow-100 text-yellow-800",
    siap_konstruksi: "bg-green-100 text-green-800",
    bangun_rumah: "bg-purple-100 text-purple-800",
    valuasi: "bg-orange-100 text-orange-800",
    kontrak_btn: "bg-red-100 text-red-800",
  }

  const program = dashboardData?.program || {
    status: "ngekos",
    ownershipBalance: 0,
    targetBalance: null,
  }

  const stats = dashboardData?.stats || {
    totalPaid: 0,
    monthsActive: 0,
    progressPercentage: 0,
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
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Dashboard
            </h1>
            <p className="text-gray-600">Selamat datang, {user.name}!</p>
          </motion.div>

          {/* Status Program */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-white rounded-xl border border-gray-200 p-6 mb-6"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-900">Status Program</h2>
              <span className={`px-4 py-2 rounded-full text-sm font-semibold ${statusColors[program.status] || statusColors.ngekos}`}>
                {statusLabels[program.status] || program.status}
              </span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <p className="text-sm text-gray-600 mb-1">Saldo Kepemilikan</p>
                <p className="text-3xl font-bold text-primary">
                  Rp {program.ownershipBalance.toLocaleString('id-ID')}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Pembayaran</p>
                <p className="text-3xl font-bold text-gray-900">
                  Rp {stats.totalPaid.toLocaleString('id-ID')}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Bulan Aktif</p>
                <p className="text-3xl font-bold text-gray-900">
                  {stats.monthsActive} bulan
                </p>
              </div>
            </div>

            {program.targetBalance && (
              <div className="mt-6">
                <div className="flex justify-between text-sm text-gray-600 mb-2">
                  <span>Progress menuju target</span>
                  <span>{stats.progressPercentage.toFixed(1)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${stats.progressPercentage}%` }}
                    transition={{ duration: 1, delay: 0.3 }}
                    className="bg-primary h-3 rounded-full"
                  />
                </div>
              </div>
            )}
          </motion.div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6"
          >
            <Link
              href="/kos"
              className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-all group"
            >
              <Search size={28} className="text-primary mb-3 group-hover:scale-110 transition-transform" />
              <h3 className="font-semibold text-gray-900 mb-1">Cari Kos Mitra</h3>
              <p className="text-sm text-gray-600">Temukan kos mitra BarumahID</p>
            </Link>

            <Link
              href="/simulasi"
              className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-all group"
            >
              <Calculator size={28} className="text-primary mb-3 group-hover:scale-110 transition-transform" />
              <h3 className="font-semibold text-gray-900 mb-1">Mulai Simulasi</h3>
              <p className="text-sm text-gray-600">Hitung estimasi saldo & timeline</p>
            </Link>

            <Link
              href="/rent-to-own"
              className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-all group"
            >
              <TrendingUp size={28} className="text-primary mb-3 group-hover:scale-110 transition-transform" />
              <h3 className="font-semibold text-gray-900 mb-1">Lihat Program</h3>
              <p className="text-sm text-gray-600">Detail rent-to-own & timeline</p>
            </Link>

            <Link
              href="/profile"
              className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-all group"
            >
              <FileText size={28} className="text-primary mb-3 group-hover:scale-110 transition-transform" />
              <h3 className="font-semibold text-gray-900 mb-1">Profil Saya</h3>
              <p className="text-sm text-gray-600">Edit data & riwayat</p>
            </Link>
          </motion.div>

          {/* Recent Payments */}
          {dashboardData?.recentPayments && dashboardData.recentPayments.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-white rounded-xl border border-gray-200 p-6"
            >
              <h2 className="text-xl font-bold text-gray-900 mb-4">Riwayat Pembayaran Terbaru</h2>
              <div className="space-y-4">
                {dashboardData.recentPayments.map((payment) => (
                  <div key={payment.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className={`p-2 rounded-lg ${payment.status === 'paid' ? 'bg-green-100' : 'bg-yellow-100'}`}>
                        {payment.status === 'paid' ? (
                          <CheckCircle className="text-green-600" size={20} />
                        ) : (
                          <Clock className="text-yellow-600" size={20} />
                        )}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">
                          Rp {payment.amount.toLocaleString('id-ID')}
                        </p>
                        <p className="text-sm text-gray-600">
                          Saldo: Rp {payment.ownershipAmount.toLocaleString('id-ID')} • {new Date(payment.paymentDate).toLocaleDateString('id-ID')}
                        </p>
                      </div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      payment.status === 'paid' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {payment.status === 'paid' ? 'Lunas' : 'Pending'}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </main>
    </>
  )
}


