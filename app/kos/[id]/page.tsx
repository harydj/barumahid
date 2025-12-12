"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { PortfolioNavbar } from "@/components/PortfolioNavbar"
import { motion } from "framer-motion"
import { MapPin, Home, DollarSign, Phone, Mail, CheckCircle, ArrowLeft, Calendar } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { Footer } from "@/components/Footer"
import { useAuth } from "@/lib/auth-context"

interface KosDetail {
  id: string
  name: string
  description: string
  address: string
  city: string
  province: string
  priceMonthly: number
  type: string
  roomType: string
  isBarumahIDPartner: boolean
  ownershipPercentage: number | null
  facilities: Array<{ name: string; icon: string | null }>
  images: Array<{ url: string; alt: string | null }>
  owner: {
    name: string
    email: string
    phone: string
  } | null
}

export default function KosDetailPage() {
  const params = useParams()
  const router = useRouter()
  const { user } = useAuth()
  const [kos, setKos] = useState<KosDetail | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [showApplicationForm, setShowApplicationForm] = useState(false)

  useEffect(() => {
    if (params.id) {
      fetchKosDetail()
    }
  }, [params.id])

  const fetchKosDetail = async () => {
    try {
      const res = await fetch(`/api/kos/${params.id}`)
      if (res.ok) {
        const data = await res.json()
        setKos(data)
      }
    } catch (error) {
      console.error("Error fetching kos detail:", error)
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!kos) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">Kos tidak ditemukan</p>
          <Link href="/kos" className="text-primary hover:underline">
            Kembali ke daftar kos
          </Link>
        </div>
      </div>
    )
  }

  const primaryImage = kos.images?.[0]?.url || '/placeholder.jpg'
  const otherImages = kos.images?.slice(1) || []

  return (
    <>
      <PortfolioNavbar />
      <main className="min-h-screen bg-gray-50 pt-20 pb-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <Link
            href="/kos"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-primary mb-6 transition-colors"
          >
            <ArrowLeft size={18} />
            <span>Kembali ke daftar kos</span>
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left: Images & Details */}
            <div className="lg:col-span-2 space-y-6">
              {/* Main Image */}
              <div className="relative h-96 w-full rounded-xl overflow-hidden">
                <Image
                  src={primaryImage}
                  alt={kos.name}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Other Images */}
              {otherImages.length > 0 && (
                <div className="grid grid-cols-4 gap-4">
                  {otherImages.map((img, idx) => (
                    <div key={idx} className="relative h-24 w-full rounded-lg overflow-hidden">
                      <Image
                        src={img.url}
                        alt={img.alt || `${kos.name} ${idx + 2}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
              )}

              {/* Description */}
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Deskripsi</h2>
                <p className="text-gray-600 whitespace-pre-line">{kos.description}</p>
              </div>

              {/* Facilities */}
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Fasilitas</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {kos.facilities.map((facility, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <span className="text-2xl">{facility.icon || "✓"}</span>
                      <span className="text-gray-700">{facility.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Info & Application */}
            <div className="space-y-6">
              <div className="bg-white rounded-xl border border-gray-200 p-6 sticky top-24">
                <div className="mb-6">
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">{kos.name}</h1>
                  {kos.isBarumahIDPartner && (
                    <div className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-semibold mb-4">
                      <CheckCircle size={16} />
                      Mitra Rent-to-Own
                    </div>
                  )}
                </div>

                <div className="space-y-4 mb-6">
                  <div className="flex items-start gap-3">
                    <MapPin className="text-gray-400 mt-1" size={20} />
                    <div>
                      <p className="text-gray-900 font-medium">{kos.address}</p>
                      <p className="text-gray-600 text-sm">{kos.city}, {kos.province}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Home className="text-gray-400" size={20} />
                    <div>
                      <p className="text-gray-900 font-medium capitalize">{kos.type} • {kos.roomType}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <DollarSign className="text-gray-400" size={20} />
                    <div>
                      <p className="text-2xl font-bold text-primary">
                        Rp {kos.priceMonthly.toLocaleString('id-ID')}
                      </p>
                      <p className="text-gray-600 text-sm">per bulan</p>
                    </div>
                  </div>

                  {kos.isBarumahIDPartner && kos.ownershipPercentage && (
                    <div className="bg-primary/10 rounded-lg p-4">
                      <p className="text-sm text-primary font-semibold mb-1">
                        💰 Program Rent-to-Own
                      </p>
                      <p className="text-sm text-gray-700">
                        {kos.ownershipPercentage}% dari sewa bulanan ({((kos.priceMonthly * kos.ownershipPercentage) / 100).toLocaleString('id-ID')} rupiah) akan menjadi saldo kepemilikan rumah Anda.
                      </p>
                    </div>
                  )}
                </div>

                {kos.owner && (
                  <div className="border-t border-gray-200 pt-6 mb-6">
                    <h3 className="font-semibold text-gray-900 mb-3">Kontak Pengelola</h3>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-gray-600">
                        <Phone size={16} />
                        <span>{kos.owner.phone}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <Mail size={16} />
                        <span>{kos.owner.email}</span>
                      </div>
                    </div>
                  </div>
                )}

                {user ? (
                  <button
                    onClick={() => setShowApplicationForm(true)}
                    className="w-full bg-primary text-primary-foreground py-3 rounded-lg font-semibold hover:bg-primary/90 transition-all"
                  >
                    Ajukan Sewa
                  </button>
                ) : (
                  <Link
                    href="/login"
                    className="block w-full bg-primary text-primary-foreground py-3 rounded-lg font-semibold hover:bg-primary/90 transition-all text-center"
                  >
                    Login untuk Ajukan Sewa
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}


