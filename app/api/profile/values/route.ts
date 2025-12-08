import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

const valueSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  order: z.number().optional().default(0),
})

export async function GET() {
  try {
    // Model CompanyValue tidak ada di schema, return empty array
    // Components akan menggunakan default data sebagai fallback
    return NextResponse.json([])
  } catch (error) {
    console.error('Error fetching company values:', error)
    return NextResponse.json([])
  }
}

export async function POST(request: NextRequest) {
  // Model CompanyValue tidak ada di schema
  return NextResponse.json(
    { error: 'CompanyValue model is not available in the current schema' },
    { status: 501 }
  )
}

