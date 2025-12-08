"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { PortfolioNavbar } from "@/components/PortfolioNavbar"
import { useAuth } from "@/lib/auth-context"
import { motion } from "framer-motion"
import { CheckCircle, Clock, TrendingUp, DollarSign, Calendar } from "lucide-react"
import { Footer } from "@/components/Footer"

const statusSteps = [
  { key: 'ngekos', label: 'Ngekos', icon: CheckCircle },
  { key: 'mengumpulkan_saldo', label: 'Mengumpulkan Saldo', icon: TrendingUp },
  { key: 'siap_konstruksi', label: 'Siap Konstruksi', icon: Clock },
  { key: 'bangun_rumah', label: 'Bangun Rumah', icon: CheckCircle },
  { key: 'valuasi', label: 'Valuasi', icon: DollarSign },
  { key: 'kontrak_btn', label: 'Kontrak BTN', icon: CheckCircle },
]

export default function RentToOwnPage() {
  const router = useRouter()
  const { user, isLoading: authLoading } = useAuth()
  const [programData, setProgramData] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/login")
    } else if (user && user.role !== "admin") {
      fetchProgram()
    }
  }, [user, authLoading, router])

  const fetchProgram = async () => {
    try {
      const res = await fetch("/api/user/rent-to-own", { cache: 'no-store' })
      if (res.ok) {
        const data = await res.json()
        setProgramData(data)
      }
    } catch (error) {
      console.error("Error fetching program:", error)
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

  if (!user || user.role === "admin" || !programData) {
    return null
  }

  const currentStatusIndex = statusSteps.findIndex(s => s.key === programData.status)

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
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Program Rent-to-Own</h1>
            <p className="text-gray-600">Status dan timeline program Anda</p>
          </motion.div>

          {/* Status Timeline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-white rounded-xl border border-gray-200 p-6 mb-6"
          >
            <h2 className="text-xl font-bold text-gray-900 mb-6">Timeline Status</h2>
            <div className="space-y-4">
              {statusSteps.map((step, index) => {
                const Icon = step.icon
                const isCompleted = index < currentStatusIndex
                const isCurrent = index === currentStatusIndex
                const isPending = index > currentStatusIndex

                return (
                  <div key={step.key} className="flex items-start gap-4">
                    <div className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center ${
                      isCompleted ? 'bg-green-500 text-white' :
                      isCurrent ? 'bg-primary text-primary-foreground' :
                      'bg-gray-200 text-gray-400'
                    }`}>
                      <Icon size={24} />
                    </div>
                    <div className="flex-1 pt-2">
                      <h3 className={`font-semibold ${
                        isCompleted || isCurrent ? 'text-gray-900' : 'text-gray-400'
                      }`}>
                        {step.label}
                      </h3>
                      {isCurrent && (
                        <p className="text-sm text-primary mt-1">Status saat ini</p>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </motion.div>

          {/* Balance & Payments */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white rounded-xl border border-gray-200 p-6"
            >
              <h2 className="text-xl font-bold text-gray-900 mb-4">Saldo Kepemilikan</h2>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Saldo Saat Ini</p>
                  <p className="text-3xl font-bold text-primary">
                    Rp {programData.ownershipBalance.toLocaleString('id-ID')}
                  </p>
                </div>
                {programData.targetBalance && (
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Target Saldo</p>
                    <p className="text-2xl font-bold text-gray-900">
                      Rp {programData.targetBalance.toLocaleString('id-ID')}
                    </p>
                    <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-primary h-2 rounded-full"
                        style={{
                          width: `${Math.min((programData.ownershipBalance / programData.targetBalance) * 100, 100)}%`,
                        }}
                      />
                    </div>
                  </div>
                )}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-white rounded-xl border border-gray-200 p-6"
            >
              <h2 className="text-xl font-bold text-gray-900 mb-4">Riwayat Pembayaran</h2>
              <div className="space-y-3">
                {programData.paymentHistory && programData.paymentHistory.length > 0 ? (
                  programData.paymentHistory.map((payment: any) => (
                    <div key={payment.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-semibold text-gray-900">
                          Rp {payment.amount.toLocaleString('id-ID')}
                        </p>
                        <p className="text-sm text-gray-600">
                          Saldo: Rp {payment.ownershipAmount.toLocaleString('id-ID')}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-600">
                          {new Date(payment.paymentDate).toLocaleDateString('id-ID')}
                        </p>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          payment.status === 'paid' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {payment.status === 'paid' ? 'Lunas' : 'Pending'}
                        </span>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-600 text-center py-4">Belum ada riwayat pembayaran</p>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}

