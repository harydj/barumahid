import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

const teamMemberSchema = z.object({
  name: z.string().min(1),
  role: z.string().min(1),
  expertise: z.string().optional(),
  image: z.string().optional(),
  bio: z.string().optional(),
  linkedin: z.string().optional(),
  order: z.number().optional().default(0),
})

export async function GET() {
  try {
    const team = await prisma.teamMember.findMany({
      orderBy: { order: 'asc' },
    })

    return NextResponse.json(team)
  } catch (error) {
    console.error('Error fetching team members:', error)
    return NextResponse.json(
      { error: 'Failed to fetch team members' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const data = teamMemberSchema.parse(body)

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

    const member = await prisma.teamMember.create({
      data: {
        ...data,
        companyProfileId: company.id,
      },
    })

    return NextResponse.json(member, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation error', details: error.errors },
        { status: 400 }
      )
    }

    console.error('Error creating team member:', error)
    return NextResponse.json(
      { error: 'Failed to create team member' },
      { status: 500 }
    )
  }
}

