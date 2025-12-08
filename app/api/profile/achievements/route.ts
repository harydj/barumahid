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
    const achievements = await prisma.achievement.findMany({
      orderBy: { order: 'asc' },
    })

    return NextResponse.json(achievements)
  } catch (error) {
    console.error('Error fetching achievements:', error)
    return NextResponse.json(
      { error: 'Failed to fetch achievements' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const data = achievementSchema.parse(body)

    // Get company profile ID (default to 'company-profile-1')
    const company = await prisma.companyProfile.findUnique({
      where: { id: 'company-profile-1' },
    })

    if (!company) {
      return NextResponse.json(
        { error: 'Company profile not found. Please run seed script first.' },
        { status: 404 }
      )
    }

    const achievement = await prisma.achievement.create({
      data: {
        ...data,
        companyProfileId: company.id,
      },
    })

    return NextResponse.json(achievement, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation error', details: error.errors },
        { status: 400 }
      )
    }

    console.error('Error creating achievement:', error)
    return NextResponse.json(
      { error: 'Failed to create achievement' },
      { status: 500 }
    )
  }
}

