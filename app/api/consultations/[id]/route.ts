import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

const consultationUpdateSchema = z.object({
  status: z.enum(['pending', 'reviewed', 'completed']).optional(),
  name: z.string().min(1).optional(),
  email: z.string().email().optional(),
  phone: z.string().min(1).optional(),
  company: z.string().optional(),
  projectType: z.string().optional(),
  description: z.string().optional(),
  budget: z.string().optional(),
})

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const consultation = await prisma.consultation.findUnique({
      where: { id: params.id },
    })

    if (!consultation) {
      return NextResponse.json(
        { error: 'Consultation not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(consultation)
  } catch (error) {
    console.error('Error fetching consultation:', error)
    return NextResponse.json(
      { error: 'Failed to fetch consultation' },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()
    const data = consultationUpdateSchema.parse(body)

    const consultation = await prisma.consultation.update({
      where: { id: params.id },
      data,
    })

    return NextResponse.json(consultation)
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation error', details: error.errors },
        { status: 400 }
      )
    }

    if (error && typeof error === 'object' && 'code' in error && error.code === 'P2025') {
      return NextResponse.json(
        { error: 'Consultation not found' },
        { status: 404 }
      )
    }

    console.error('Error updating consultation:', error)
    return NextResponse.json(
      { error: 'Failed to update consultation' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.consultation.delete({
      where: { id: params.id },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    if (error && typeof error === 'object' && 'code' in error && error.code === 'P2025') {
      return NextResponse.json(
        { error: 'Consultation not found' },
        { status: 404 }
      )
    }

    console.error('Error deleting consultation:', error)
    return NextResponse.json(
      { error: 'Failed to delete consultation' },
      { status: 500 }
    )
  }
}

