import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

const pricingSchema = z.object({
  name: z.string().min(1).optional(),
  description: z.string().optional(),
  priceMonthly: z.number().nullable().optional(),
  priceYearly: z.number().nullable().optional(),
  popular: z.boolean().optional(),
  features: z.array(z.string()).optional(),
  order: z.number().optional(),
})

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()
    const data = pricingSchema.parse(body)

    const pricing = await prisma.pricingPackage.update({
      where: { id: params.id },
      data,
    })

    return NextResponse.json(pricing)
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation error', details: error.errors },
        { status: 400 }
      )
    }

    if (error && typeof error === 'object' && 'code' in error && error.code === 'P2025') {
      return NextResponse.json(
        { error: 'Pricing package not found' },
        { status: 404 }
      )
    }

    console.error('Error updating pricing package:', error)
    return NextResponse.json(
      { error: 'Failed to update pricing package' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.pricingPackage.delete({
      where: { id: params.id },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    if (error && typeof error === 'object' && 'code' in error && error.code === 'P2025') {
      return NextResponse.json(
        { error: 'Pricing package not found' },
        { status: 404 }
      )
    }

    console.error('Error deleting pricing package:', error)
    return NextResponse.json(
      { error: 'Failed to delete pricing package' },
      { status: 500 }
    )
  }
}

