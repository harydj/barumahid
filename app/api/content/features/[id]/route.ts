import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

const featureSchema = z.object({
  title: z.string().min(1).optional(),
  description: z.string().optional(),
  icon: z.string().optional(),
  order: z.number().optional(),
})

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()
    const data = featureSchema.parse(body)

    const feature = await prisma.feature.update({
      where: { id: params.id },
      data,
    })

    return NextResponse.json(feature)
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation error', details: error.errors },
        { status: 400 }
      )
    }

    if (error && typeof error === 'object' && 'code' in error && error.code === 'P2025') {
      return NextResponse.json(
        { error: 'Feature not found' },
        { status: 404 }
      )
    }

    console.error('Error updating feature:', error)
    return NextResponse.json(
      { error: 'Failed to update feature' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.feature.delete({
      where: { id: params.id },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    if (error && typeof error === 'object' && 'code' in error && error.code === 'P2025') {
      return NextResponse.json(
        { error: 'Feature not found' },
        { status: 404 }
      )
    }

    console.error('Error deleting feature:', error)
    return NextResponse.json(
      { error: 'Failed to delete feature' },
      { status: 500 }
    )
  }
}

