"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { PortfolioNavbar } from "@/components/PortfolioNavbar"
import { HouseDesignPackages } from "@/components/HouseDesignPackages"
import { useAuth } from "@/lib/auth-context"
import { motion } from "framer-motion"
import { Home, CheckCircle } from "lucide-react"
import { Footer } from "@/components/Footer"

interface HouseDesign {
  id: string
  name: string
  slug: string
  description: string
  size: number
  bedrooms: number
  bathrooms: number
  features: string[] | null
  images: string[] | null
  basePrice: number
}

export default function ReadyToBuildPage() {
  const router = useRouter()
  const { user, isLoading: authLoading } = useAuth()
  const [designs, setDesigns] = useState<HouseDesign[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedDesign, setSelectedDesign] = useState<string | null>(null)

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/login")
    } else {
      fetchDesigns()
    }
  }, [user, authLoading, router])

  const fetchDesigns = async () => {
    try {
      const res = await fetch("/api/house-designs")
      if (res.ok) {
        const data = await res.json()
        setDesigns(data)
      }
    } catch (error) {
      console.error("Error fetching designs:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSelectDesign = (designId: string) => {
    setSelectedDesign(designId)
    // TODO: Show application form or redirect to application page
    alert("Fitur aplikasi konstruksi akan segera tersedia")
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
              <Home className="text-primary" size={32} />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Ready to Build</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Pilih desain rumah impian Anda dan ajukan pembangunan
            </p>
          </motion.div>

          {designs.length > 0 ? (
            <HouseDesignPackages designs={designs} onSelect={handleSelectDesign} />
          ) : (
            <div className="text-center py-20">
              <p className="text-gray-600">Belum ada desain rumah tersedia</p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}


