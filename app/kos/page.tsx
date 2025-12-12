"use client"

import { useEffect, useState } from "react"
import { PortfolioNavbar } from "@/components/PortfolioNavbar"
import { KosCard } from "@/components/KosCard"
import { KosFilter } from "@/components/KosFilter"
import { Search, Loader2 } from "lucide-react"
import { motion } from "framer-motion"
import { Footer } from "@/components/Footer"

interface Kos {
  id: string
  name: string
  slug: string
  address: string
  city: string
  priceMonthly: number
  type: string
  roomType: string
  isBarumahIDPartner: boolean
  ownershipPercentage: number | null
  images: Array<{ url: string; alt?: string | null }>
}

interface FilterState {
  city: string
  type: string
  roomType: string
  minPrice: string
  maxPrice: string
  isPartner: boolean
}

export default function KosPage() {
  const [kosList, setKosList] = useState<Kos[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [filters, setFilters] = useState<FilterState>({
    city: "",
    type: "",
    roomType: "",
    minPrice: "",
    maxPrice: "",
    isPartner: false,
  })
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    fetchKos()
  }, [filters])

  const fetchKos = async () => {
    setIsLoading(true)
    try {
      const params = new URLSearchParams()
      if (filters.city) params.append("city", filters.city)
      if (filters.type) params.append("type", filters.type)
      if (filters.roomType) params.append("roomType", filters.roomType)
      if (filters.minPrice) params.append("minPrice", filters.minPrice)
      if (filters.maxPrice) params.append("maxPrice", filters.maxPrice)
      if (filters.isPartner) params.append("isPartner", "true")

      const res = await fetch(`/api/kos?${params.toString()}`)
      if (res.ok) {
        const data = await res.json()
        setKosList(data)
      }
    } catch (error) {
      console.error("Error fetching kos:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const filteredKos = kosList.filter((kos) => {
    if (!searchQuery) return true
    const query = searchQuery.toLowerCase()
    return (
      kos.name.toLowerCase().includes(query) ||
      kos.city.toLowerCase().includes(query) ||
      kos.address.toLowerCase().includes(query)
    )
  })

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
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Cari Kos Mitra</h1>
            <p className="text-gray-600">Temukan kos mitra BarumahID untuk program rent-to-own</p>
          </motion.div>

          {/* Search Bar */}
          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari kos berdasarkan nama, kota, atau alamat..."
                className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary/20 bg-white"
              />
            </div>
          </div>

          {/* Filter */}
          <KosFilter onFilterChange={setFilters} />

          {/* Results */}
          {isLoading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="animate-spin text-primary" size={32} />
            </div>
          ) : filteredKos.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-600">Tidak ada kos yang ditemukan</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredKos.map((kos) => (
                <KosCard key={kos.id} kos={kos} />
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}


