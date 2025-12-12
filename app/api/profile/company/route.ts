import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

const companySchema = z.object({
  companyName: z.string().min(1),
  tagline: z.string().optional(),
  aboutDescription: z.string().optional(),
  vision: z.string().optional(),
  mission: z.string().optional(),
  foundingDate: z.string().optional(),
})

export async function GET() {
  try {
    const company = await prisma.companyProfile.findFirst({
      orderBy: { createdAt: 'desc' },
    })

    return NextResponse.json(company)
  } catch (error) {
    console.error('Error fetching company profile:', error)
    return NextResponse.json(
      { error: 'Failed to fetch company profile' },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const data = companySchema.parse(body)

    // Get or create company profile
    let company = await prisma.companyProfile.findFirst()

    if (company) {
      company = await prisma.companyProfile.update({
        where: { id: company.id },
        data: {
          ...data,
          foundingDate: data.foundingDate ? new Date(data.foundingDate) : undefined,
        },
      })
    } else {
      company = await prisma.companyProfile.create({
        data: {
          ...data,
          foundingDate: data.foundingDate ? new Date(data.foundingDate) : undefined,
        },
      })
    }

    return NextResponse.json(company)
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation error', details: error.errors },
        { status: 400 }
      )
    }

    console.error('Error updating company profile:', error)
    return NextResponse.json(
      { error: 'Failed to update company profile' },
      { status: 500 }
    )
  }
}


