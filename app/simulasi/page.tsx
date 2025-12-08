"use client"

import { useState } from "react"
import { PortfolioNavbar } from "@/components/PortfolioNavbar"
import { SimulationForm } from "@/components/SimulationForm"
import { SimulationResult } from "@/components/SimulationResult"
import { motion } from "framer-motion"
import { Calculator } from "lucide-react"
import { Footer } from "@/components/Footer"
import { useAuth } from "@/lib/auth-context"

interface SimulationData {
  monthlyRent: number
  ownershipPercentage: number
  targetHousePrice: number
  rentDuration: number
}

interface SimulationResponse {
  simulation: {
    id: string
    estimatedBalance: number
    estimatedMonths: number
  }
  results: Array<{
    month: number
    balance: number
    totalPaid: number
  }>
}

export default function SimulasiPage() {
  const { user } = useAuth()
  const [simulationResult, setSimulationResult] = useState<SimulationResponse | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState<SimulationData | null>(null)

  const handleSubmit = async (data: SimulationData) => {
    setIsLoading(true)
    setFormData(data)

    try {
      const res = await fetch("/api/simulasi", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          monthlyRent: data.monthlyRent,
          ownershipPercentage: data.ownershipPercentage,
          targetHousePrice: data.targetHousePrice,
          rentDuration: data.rentDuration,
          userId: user?.id || null,
        }),
      })

      if (res.ok) {
        const result = await res.json()
        setSimulationResult(result)
      } else {
        const error = await res.json()
        const errorMessage = error.details 
          ? `Validation error: ${JSON.stringify(error.details, null, 2)}`
          : (error.error || "Failed to calculate simulation")
        console.error("Simulation error:", error)
        alert("Error: " + errorMessage)
      }
    } catch (error) {
      console.error("Error calculating simulation:", error)
      alert("Terjadi kesalahan saat menghitung simulasi")
    } finally {
      setIsLoading(false)
    }
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
            className="mb-8 text-center"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
              <Calculator className="text-primary" size={32} />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Simulasi Rumah</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Hitung estimasi kapan Anda siap membangun rumah dengan program rent-to-own BarumahID
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-white rounded-xl border border-gray-200 p-6"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Input Data</h2>
              <SimulationForm onSubmit={handleSubmit} isLoading={isLoading} />
            </motion.div>

            {/* Results */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {simulationResult && formData ? (
                <SimulationResult
                  estimatedBalance={simulationResult.simulation.estimatedBalance}
                  estimatedMonths={simulationResult.simulation.estimatedMonths}
                  targetPrice={formData.targetHousePrice}
                  results={simulationResult.results}
                />
              ) : (
                <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
                  <Calculator className="text-gray-400 mx-auto mb-4" size={48} />
                  <p className="text-gray-600">
                    Isi form di sebelah kiri dan klik "Hitung Simulasi" untuk melihat hasil
                  </p>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}

