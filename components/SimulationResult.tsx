"use client"

import { motion } from "framer-motion"
import { TrendingUp, Calendar, DollarSign, Target } from "lucide-react"

interface SimulationResultProps {
  estimatedBalance: number
  estimatedMonths: number
  targetPrice: number
  results: Array<{
    month: number
    balance: number
    totalPaid: number
  }>
}

export const SimulationResult = ({ estimatedBalance, estimatedMonths, targetPrice, results }: SimulationResultProps) => {
  const progressPercentage = targetPrice > 0 ? (estimatedBalance / targetPrice) * 100 : 0
  const isTargetReached = estimatedBalance >= targetPrice

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-xl border border-gray-200 p-6"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-primary/10 rounded-lg">
              <DollarSign className="text-primary" size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-600">Perkiraan Saldo</p>
              <p className="text-2xl font-bold text-gray-900">
                Rp {estimatedBalance.toLocaleString('id-ID')}
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-white rounded-xl border border-gray-200 p-6"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-primary/10 rounded-lg">
              <Calendar className="text-primary" size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-600">Estimasi Waktu</p>
              <p className="text-2xl font-bold text-gray-900">
                {estimatedMonths} bulan
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Progress to Target */}
      {targetPrice > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white rounded-xl border border-gray-200 p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Target className="text-primary" size={20} />
              <h3 className="font-semibold text-gray-900">Progress ke Target</h3>
            </div>
            <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
              isTargetReached ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
            }`}>
              {progressPercentage.toFixed(1)}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-4 mb-2">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${Math.min(progressPercentage, 100)}%` }}
              transition={{ duration: 1, delay: 0.3 }}
              className={`h-4 rounded-full ${isTargetReached ? 'bg-green-500' : 'bg-primary'}`}
            />
          </div>
          <div className="flex justify-between text-sm text-gray-600">
            <span>Saldo: Rp {estimatedBalance.toLocaleString('id-ID')}</span>
            <span>Target: Rp {targetPrice.toLocaleString('id-ID')}</span>
          </div>
        </motion.div>
      )}

      {/* Chart/Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="bg-white rounded-xl border border-gray-200 p-6"
      >
        <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <TrendingUp className="text-primary" size={20} />
          Proyeksi Bulanan
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Bulan</th>
                <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700">Total Dibayar</th>
                <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700">Saldo Kepemilikan</th>
              </tr>
            </thead>
            <tbody>
              {results.map((result, idx) => (
                <tr key={result.month} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4 text-sm text-gray-900">Bulan {result.month}</td>
                  <td className="py-3 px-4 text-sm text-gray-600 text-right">
                    Rp {result.totalPaid.toLocaleString('id-ID')}
                  </td>
                  <td className="py-3 px-4 text-sm font-semibold text-primary text-right">
                    Rp {result.balance.toLocaleString('id-ID')}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  )
}


