import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

const achievementSchema = z.object({
  icon: z.string().optional(),
  number: z.string().min(1),
  label: z.string().min(1),
  order: z.number().optional().default(0),
})

export async function GET() {
  try {
    // Model Achievement tidak ada di schema, return empty array
    // Components akan menggunakan default data sebagai fallback
    return NextResponse.json([])
  } catch (error) {
    console.error('Error fetching achievements:', error)
    return NextResponse.json([])
  }
}

export async function POST(request: NextRequest) {
  // Model Achievement tidak ada di schema
  return NextResponse.json(
    { error: 'Achievement model is not available in the current schema' },
    { status: 501 }
  )
}

