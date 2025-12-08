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
    const values = await prisma.companyValue.findMany({
      orderBy: { order: 'asc' },
    })

    return NextResponse.json(values)
  } catch (error) {
    console.error('Error fetching company values:', error)
    return NextResponse.json(
      { error: 'Failed to fetch company values' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const data = valueSchema.parse(body)

    const value = await prisma.companyValue.create({
      data,
    })

    return NextResponse.json(value, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation error', details: error.errors },
        { status: 400 }
      )
    }

    console.error('Error creating company value:', error)
    return NextResponse.json(
      { error: 'Failed to create company value' },
      { status: 500 }
    )
  }
}

