import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

const pricingSchema = z.object({
  name: z.string().min(1),
  description: z.string().optional(),
  priceMonthly: z.number().optional(),
  priceYearly: z.number().optional(),
  popular: z.boolean().optional().default(false),
  features: z.array(z.string()).optional(),
  order: z.number().optional().default(0),
})

export async function GET() {
  try {
    const pricing = await prisma.pricingPackage.findMany({
      orderBy: { order: 'asc' },
    })

    return NextResponse.json(pricing)
  } catch (error) {
    console.error('Error fetching pricing packages:', error)
    return NextResponse.json(
      { error: 'Failed to fetch pricing packages' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const data = pricingSchema.parse(body)

    // Get homepage content ID (default to 'homepage-1')
    const homepage = await prisma.homePageContent.findUnique({
      where: { id: 'homepage-1' },
    })

    if (!homepage) {
      return NextResponse.json(
        { error: 'Homepage content not found. Please run seed script first.' },
        { status: 404 }
      )
    }

    const pricing = await prisma.pricingPackage.create({
      data: {
        ...data,
        features: data.features || [],
        homePageContentId: homepage.id,
      },
    })

    return NextResponse.json(pricing, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation error', details: error.errors },
        { status: 400 }
      )
    }

    console.error('Error creating pricing package:', error)
    return NextResponse.json(
      { error: 'Failed to create pricing package' },
      { status: 500 }
    )
  }
}

