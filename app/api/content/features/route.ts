import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

const featureSchema = z.object({
  title: z.string().min(1),
  description: z.string(),
  icon: z.string().optional(),
  order: z.number().optional().default(0),
})

export async function GET() {
  try {
    const features = await prisma.feature.findMany({
      orderBy: { order: 'asc' },
    })

    return NextResponse.json(features)
  } catch (error) {
    console.error('Error fetching features:', error)
    return NextResponse.json(
      { error: 'Failed to fetch features' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const data = featureSchema.parse(body)

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

    const feature = await prisma.feature.create({
      data: {
        ...data,
        homePageContentId: homepage.id,
      },
    })

    return NextResponse.json(feature, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation error', details: error.errors },
        { status: 400 }
      )
    }

    console.error('Error creating feature:', error)
    return NextResponse.json(
      { error: 'Failed to create feature' },
      { status: 500 }
    )
  }
}

