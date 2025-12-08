import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

const lbagSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  order: z.number().optional().default(0),
})

export async function GET() {
  try {
    const lbag = await prisma.lBAGTech.findMany({
      orderBy: { order: 'asc' },
    })

    return NextResponse.json(lbag)
  } catch (error) {
    console.error('Error fetching LBAG tech:', error)
    return NextResponse.json(
      { error: 'Failed to fetch LBAG tech' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const data = lbagSchema.parse(body)

    const lbag = await prisma.lBAGTech.create({
      data,
    })

    return NextResponse.json(lbag, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation error', details: error.errors },
        { status: 400 }
      )
    }

    console.error('Error creating LBAG tech:', error)
    return NextResponse.json(
      { error: 'Failed to create LBAG tech' },
      { status: 500 }
    )
  }
}

