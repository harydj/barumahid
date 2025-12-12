"use client"

import { motion } from "framer-motion"
import { MapPin, Home, DollarSign, ArrowRight } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

interface KosCardProps {
  kos: {
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
}

export const KosCard = ({ kos }: KosCardProps) => {
  const primaryImage = kos.images?.[0]?.url || '/placeholder.jpg'

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-xl transition-all"
    >
      <div className="relative h-48 w-full">
        <Image
          src={primaryImage}
          alt={kos.name}
          fill
          className="object-cover"
        />
        {kos.isBarumahIDPartner && (
          <div className="absolute top-4 right-4 bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-semibold">
            Mitra Rent-to-Own
          </div>
        )}
      </div>

      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2">{kos.name}</h3>
        
        <div className="flex items-center gap-2 text-gray-600 mb-4">
          <MapPin size={16} />
          <span className="text-sm">{kos.city}</span>
        </div>

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4 text-sm text-gray-600">
            <div className="flex items-center gap-1">
              <Home size={16} />
              <span className="capitalize">{kos.type}</span>
            </div>
            <div className="flex items-center gap-1">
              <DollarSign size={16} />
              <span>Rp {kos.priceMonthly.toLocaleString('id-ID')}/bulan</span>
            </div>
          </div>
        </div>

        {kos.isBarumahIDPartner && kos.ownershipPercentage && (
          <div className="bg-primary/10 rounded-lg p-3 mb-4">
            <p className="text-sm text-primary font-semibold">
              💰 {kos.ownershipPercentage}% dari sewa menjadi saldo kepemilikan
            </p>
          </div>
        )}

        <Link
          href={`/kos/${kos.id}`}
          className="inline-flex items-center gap-2 text-primary font-semibold hover:underline"
        >
          Lihat Detail
          <ArrowRight size={16} />
        </Link>
      </div>
    </motion.div>
  )
}


