import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

const consultationSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  phone: z.string().min(1),
  company: z.string().optional(),
  projectType: z.string().min(1),
  description: z.string().min(1),
  budget: z.string().optional(),
})

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status')

    const consultations = await prisma.consultation.findMany({
      where: status ? { status: status as 'pending' | 'reviewed' | 'completed' } : undefined,
      orderBy: { createdAt: 'desc' },
    })

    return NextResponse.json(consultations)
  } catch (error) {
    console.error('Error fetching consultations:', error)
    return NextResponse.json(
      { error: 'Failed to fetch consultations' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const data = consultationSchema.parse(body)

    const consultation = await prisma.consultation.create({
      data,
    })

    return NextResponse.json(consultation, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation error', details: error.errors },
        { status: 400 }
      )
    }

    console.error('Error creating consultation:', error)
    return NextResponse.json(
      { error: 'Failed to create consultation' },
      { status: 500 }
    )
  }
}

