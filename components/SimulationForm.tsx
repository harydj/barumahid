"use client"

import { useState } from "react"
import { Calculator } from "lucide-react"

interface SimulationFormProps {
  onSubmit: (data: SimulationData) => void
  isLoading?: boolean
}

interface SimulationData {
  monthlyRent: number
  ownershipPercentage: number
  targetHousePrice: number
  rentDuration: number
}

export const SimulationForm = ({ onSubmit, isLoading }: SimulationFormProps) => {
  const [formData, setFormData] = useState<SimulationData>({
    monthlyRent: 1500000,
    ownershipPercentage: 10,
    targetHousePrice: 50000000,
    rentDuration: 24,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validate form data
    if (
      isNaN(formData.monthlyRent) ||
      isNaN(formData.ownershipPercentage) ||
      isNaN(formData.targetHousePrice) ||
      isNaN(formData.rentDuration) ||
      formData.monthlyRent <= 0 ||
      formData.ownershipPercentage < 0 ||
      formData.ownershipPercentage > 100 ||
      formData.targetHousePrice <= 0 ||
      formData.rentDuration < 1
    ) {
      alert("Mohon isi semua field dengan nilai yang valid")
      return
    }
    
    onSubmit(formData)
  }

  const monthlyOwnership = (formData.monthlyRent * formData.ownershipPercentage) / 100

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Biaya Sewa Bulanan (Rp)
        </label>
        <input
          type="number"
          value={formData.monthlyRent}
          onChange={(e) => setFormData({ ...formData, monthlyRent: parseFloat(e.target.value) || 0 })}
          min="0"
          step="100000"
          required
          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary/20"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Persentase Saldo yang Didapat (%)
        </label>
        <input
          type="number"
          value={formData.ownershipPercentage}
          onChange={(e) => setFormData({ ...formData, ownershipPercentage: parseFloat(e.target.value) || 0 })}
          min="0"
          max="100"
          step="1"
          required
          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary/20"
        />
        <p className="text-xs text-gray-500 mt-1">
          Saldo per bulan: Rp {monthlyOwnership.toLocaleString('id-ID')}
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Target Harga Rumah (Rp)
        </label>
        <input
          type="number"
          value={formData.targetHousePrice}
          onChange={(e) => setFormData({ ...formData, targetHousePrice: parseFloat(e.target.value) || 0 })}
          min="0"
          step="1000000"
          required
          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary/20"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Lama Sewa (bulan)
        </label>
        <input
          type="number"
          value={formData.rentDuration}
          onChange={(e) => setFormData({ ...formData, rentDuration: parseInt(e.target.value) || 0 })}
          min="1"
          step="1"
          required
          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary/20"
        />
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-primary text-primary-foreground py-3 rounded-lg font-semibold hover:bg-primary/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        <Calculator size={20} />
        {isLoading ? "Menghitung..." : "Hitung Simulasi"}
      </button>
    </form>
  )
}

